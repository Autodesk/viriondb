var fs = require('fs');

var readData = function (callback) {
	fs.readFile('./data.json', 'utf8', function(err, res) {
		var json = JSON.parse(res);
		callback(json);
	});
};

var writeFile = function (name, json) {
	fs.writeFile('./' + name, JSON.stringify(json, null, 2), 'utf8');
}

module.exports = {
	readData: readData,
	writeFile: writeFile
};