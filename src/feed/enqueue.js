const config = require('../config')
var sliced = require('sliced');
var noop = function(){};

class Enqueue {
    constructor () {
        this.pending = 1;
        this.jobs = [];
    }

    run(fn, options) {
        options = options || {};

        this.delay = options.delay || 0;

        var self = this;
        return async function() {
            var args = sliced(arguments);
            var last = args[args.length - 1];
            var end = 'function' == typeof last && last;

            // remove "on end" function if there is one
            end = end ? args.pop() : noop;
        
            // remove "on end" function if there is one
            self.jobs.push([this, args]);
            if ( config.verbose ) {
                console.log("Enqueue: job added. Current jobs queue length: " + self.jobs.length);
            }
            return await next();
        
            async function next() {
                if (self.pending > 1) {
                    if ( config.verbose ) {
                        console.log("Enqueue: pending=" + self.pending + " => await for queue to clear");
                    }
                    return new Promise((resolve, reject) => {
                        var x = setInterval(() => {
                            if (self.pending <= 1) {
                                if ( config.verbose ) {
                                    console.log("Enqueue: await ended. Execution resumed");
                                }
                                try {
                                    clearInterval(x);
                                    resolve(next());
                                } catch(e) {
                                    reject(e);
                                }
                            } else if ( config.verbose ) {
                                console.log("Enqueue: still waiting");
                            }
                        }, self.delay);
                    });
                }

                if ( config.verbose ) {
                    console.log("Enqueue: processing job. Current jobs queue length: " + self.jobs.length + ". Pending: " + self.pending);
                }
                var job = self.jobs.shift();
                if (!job) {
                    if ( config.verbose ) {
                        console.log("Enqueue: no job found => exit");
                    }
                    return;
                }
        
                self.pending++;
        
                var timeoutPromise = (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms));
                }
        
                // call the fn
                await timeoutPromise(self.delay);
                var result = fn.apply(job[0], job[1]);
                done.apply(job[0], job[1]);
                return result;
            }
        
            function done() {
                self.pending--;
                return end.apply(this, arguments);
            }
        }.bind(options._this);
    }
}

exports = module.exports = Enqueue;