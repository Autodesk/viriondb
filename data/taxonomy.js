var utils = require('./utils.js');
var _ = require('lodash');


utils.readData(function (json) {
	var tree = {};

	_.forEach(json, function (item) {

		var tax = item.taxonomy
		.replace('[', '')
		.replace(']', '')
		.trim()
		.replace(/\'/gi, '')
		.split(', ')
		.concat('instances');

		var val = _.get(tree, tax);

		if (_.isObject(val)) {
			console.log(item.id);
		}

		//todo - handle it being an object

		var next = val ? val + 1 : 1;
	
		_.set(tree, tax, next)
	});

	utils.writeFile('taxonomy.json', tree);
});