'use strict';

class BaseControllerClass {
	constructor (req, res) {
        this.req = req;
        this.res = res;
        this.auth = null;

        // The user is set the the middleware authentication check. If not, then return null
        if (req.user)
            this.user = req.user;
        else
            this.user = {id: 1};
    }
    
    getBodyParam (paramName) {
        if (this.req.body && paramName) 
            return this.req.body[paramName];
        else
            return null;
    }

    getRequestParam (paramName) {
        if (this.req.params && paramName) 
            return this.req.params[paramName];
        else
            return null;
    }

    getUserId () {
        if (this.user)
            return this.user.id;
        else    
            return 1;
    }
}

exports = module.exports = BaseControllerClass;