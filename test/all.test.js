// --------------------
// toposort extended
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	toposort = require('../lib/');

// init

chai.config.includeStack = true;

// tests

describe('toposort', function() {
	it('sorts strings', function() {
		var sorted = toposort([
			['Ingredient', 'Shop'],
			['Food', 'Ingredient']
		]);

		expect(sorted).to.deep.equal(['Food', 'Ingredient', 'Shop']);
	});

	it('sorts objects', function() {
		var sorted = toposort([
			[ { table: 'Ingredient' }, { table: 'Shop' } ],
			[ { table: 'Food' }, { table: 'Ingredient' } ]
		]);

		expect(sorted).to.deep.equal([ { table: 'Food' }, { table: 'Ingredient' }, { table: 'Shop' } ]);
	});

	it('throws error on cyclic dependency', function() {
		expect(function() {
			toposort([
				[ { table: 'Ingredient' }, { table: 'Shop' } ],
				[ { table: 'Food' }, { table: 'Ingredient' } ],
				[ { table: 'Shop' }, { table: 'Food' } ]
			]);
		}).to.throw(toposort.Error, 'Cyclic dependency: {"table":"Food"}');
	});
});

describe('toposort.dependents', function() {
	it('sorts strings', function() {
		var sorted = toposort.dependents([
			['Ingredient', 'Shop'],
			['Food', 'Ingredient']
		]);

		expect(sorted).to.deep.equal(['Food', 'Ingredient']);
	});

	it('sorts objects', function() {
		var sorted = toposort.dependents([
			[ { table: 'Ingredient' }, { table: 'Shop' } ],
			[ { table: 'Food' }, { table: 'Ingredient' } ]
		]);

		expect(sorted).to.deep.equal([ { table: 'Food' }, { table: 'Ingredient' } ]);
	});

	it('throws error on cyclic dependency', function() {
		expect(function() {
			toposort.dependents([
				[ { table: 'Ingredient' }, { table: 'Shop' } ],
				[ { table: 'Food' }, { table: 'Ingredient' } ],
				[ { table: 'Shop' }, { table: 'Food' } ]
			]);
		}).to.throw(toposort.Error, 'Cyclic dependency: {"table":"Food"}');
	});
});
