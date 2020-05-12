var Download = require('./download'),
	async = require('async'),
	fs = require('fs'),
	Enqueue = require('./enqueue'),
	config = require('../config');

var download = new Download();
var league = process.argv[2];
if (!league) {
	console.log('usage: downloadImages.js <league>');
	return;
}

league = league.toLowerCase();
var baseUri = 'https://api.sportradar.us/nfl-images-t3/ap';
var manifest = JSON.parse(fs.readFileSync('public/' + league + '-headshot-manifest.json', 'utf8'));
var images = manifest.assetlist.map(x => {
	var result = x.links.find(y => { return y.width == 40 && y.height == 40; });
	result.id = x.id;
	result.player_id = x.player_id;

	return result;
});

if ( config.verbose ) console.log('Dwnloading images for ' + league);

//images = images.slice(0, 2);

var enqueue = new Enqueue();
var download = new Download();
var fnQueuedDownload = enqueue.run(function(download, count) {
	var image = images[count];
	var uri = baseUri + image.href + '?api_key=' + config.feed.leagues.find(x => x.league.toLowerCase() == league).imagesApiKey;
	var fileName = image.href.replace('/headshots/players/', __dirname + '/../../public/images/' + league + '/');
	var lastSlash = fileName.lastIndexOf('/');
	fileName = fileName.substring(0, lastSlash) + '.' + fileName.substring(lastSlash + 1);
	fileName = fileName.replace('-crop', '');
	fileName = fileName.replace(image.id, image.player_id);
	
	if ( config.verbose ) console.log('downloading ' + uri + ' ...');
	return download.get(uri, fileName);
});
var count = 0, total = images.length;
async.whilst(
	function() { return count < total; },
	async function(callback) {
		await fnQueuedDownload(download, count);
		count++;
		callback();
	},
	function() {
		if ( config.verbose ) console.log('Downloaded ' + count + ' images.');
	}
);