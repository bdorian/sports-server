var fs = require('fs'),
	rpStream = require('./request-promise-stream-resolve');
	
class Download {
	constructor() {
		this.options = {
			headers: {
				'accept': 'image/*',
				'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36'
			}
		}
	}
	
	async get(uri, fileName) {
		var out = fs.createWriteStream(fileName);
		var response = await rpStream(uri, this.options);
		await response.pipe(out);
	}
}

exports = module.exports = Download;