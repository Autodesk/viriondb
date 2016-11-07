var utils = require('./utils.js');

utils.readData(function (json) {
  var ignores = ['accession', 'name', 'description', 'locus', 'taxonomy', 'id', 'derived_taxonomy_genus', 'derived_lineage', 'length', 'genus'];

  var fields = json.reduce(function (acc, item) {
    Object.keys(item).forEach(function (fieldName) {
      var fieldVal = item[fieldName] || 'Unknown';

      if (ignores.indexOf(fieldName) >= 0) {
        return;
      }

      if (!acc[fieldName]) {
        acc[fieldName] = {};
      }

      if (!acc[fieldName][fieldVal]) {
        acc[fieldName][fieldVal] = 0;
      }

      acc[fieldName][fieldVal] += 1;
    });

    return acc;
  }, {});

  utils.writeFile('fields.json', fields);
});