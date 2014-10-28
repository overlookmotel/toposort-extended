// --------------------
// toposort extended
// --------------------

// modules
var toposortOrig = require('toposort'),
	util = require('util');

// exports
var toposort = module.exports = function(edges) {
	var edgesTranslate = {};
	edges = edges.map(function(item) {
		var str1 = JSON.stringify(item[0]),
			str2 = JSON.stringify(item[1]);
		
		edgesTranslate[str1] = item[0];
		edgesTranslate[str2] = item[1];
		
		return [str1, str2];
	});
	
	try {
		edges = toposortOrig(edges);
	} catch(err) {
		if (err.message.slice(0, 19) == 'Cyclic dependency: ') {
			var edgeStr = JSON.parse(err.message.slice(19));
			throw new toposort.Error('Cyclic dependency: ' + edgeStr, edgesTranslate[edgeStr]);
		} else {
			throw err;
		}
	}
	
	return edges.map(function(edgeStr) {
		return edgesTranslate[edgeStr];
	});
};

toposort.dependents = function(edges) {
	// toposort array
	var dependents = toposort(edges);
	
	// remove array items which are not dependents + return
	edges = edges.map(function(item) {return JSON.stringify(item[0]);});
	return dependents.filter(function(item) {return edges.indexOf(JSON.stringify(item)) != -1;});
};

toposort.Error = function(message, edge) {
	this.name = 'ToposortError';
	this.message = message;
	this.edge = edge;
};
util.inherits(toposort.Error, Error);
