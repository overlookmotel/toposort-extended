// --------------------
// toposort extended
// --------------------

// modules
var toposortOrig = require('toposort'),
	util = require('util');

// exports
var toposort = exports = module.exports = function(edges) {
	edges = edges.map(function(item) {
		return [JSON.stringify(item[0]), JSON.stringify(item[1])];
	});
	
	try {
		edges = toposortOrig(edges);
	} catch(err) {
		if (err.message.slice(0, 19) == 'Cyclic dependency: ') {
			var edgeStr = JSON.parse(err.message.slice(19));
			throw new toposort.Error('Cyclic dependency: ' + edgeStr, JSON.parse(edgeStr));
		} else {
			throw err;
		}
	}
	
	return edges.map(JSON.parse);
};

toposort.dependents = function(edges) {
	// toposort array
	var dependents = toposort(edges);
	
	// remove array items which are not dependents + return
	edges = edges.map(function(item) {return JSON.stringify(item[0])});
	return dependents.filter(function(item) {return edges.indexOf(JSON.stringify(item)) != -1});
};

toposort.Error = function(message, edge) {
	this.name = 'ToposortError';
	this.message = message;
	this.edge = edge;
};
util.inherits(toposort.Error, Error);
