# toposort-extended.js

[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/toposort-extended.svg)](https://greenkeeper.io/)

# toposort with objects

## What it does

An extension of [toposort](https://github.com/marcelklehr/toposort) where the inputs can be objects.

## Current status

[![NPM version](https://img.shields.io/npm/v/toposort-extended.svg)](https://www.npmjs.com/package/toposort-extended)
[![Build Status](https://img.shields.io/travis/overlookmotel/toposort-extended/master.svg)](http://travis-ci.org/overlookmotel/toposort-extended)
[![Dependency Status](https://img.shields.io/david/overlookmotel/toposort-extended.svg)](https://david-dm.org/overlookmotel/toposort-extended)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/toposort-extended.svg)](https://david-dm.org/overlookmotel/toposort-extended)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/toposort-extended/master.svg)](https://coveralls.io/r/overlookmotel/toposort-extended)

API is stable and tests cover all options. No known issues.

## Usage

### Main method
#### toposort(edges)

```js
var toposort = require('toposort-extended');

sorted = toposort( [
	[ { table: 'Ingredient' }, { table: 'Shop' } ],
	[ { table: 'Food' }, { table: 'Ingredient' } ]
] );

// sorted = [ { table: 'Food' }, { table: 'Ingredient' }, { table: 'Shop' } ]
```

Exactly the same as original [toposort](https://github.com/marcelklehr/toposort), except:

* Inputs are converted to JSON before ordering so objects can be used as input
* Cyclic dependency errors are thrown as custom class `toposort.Error` with the source of the error passed as `edge`

#### toposort.dependents(edges)

Same as `toposort(edges)` except that items which are not dependent on any other item are excluded from the returned array.

```js
sorted = toposort.dependents( [
	[ { table: 'Ingredient' }, { table: 'Shop' } ],
	[ { table: 'Food' }, { table: 'Ingredient' } ]
] );

// sorted = [ { table: 'Food' }, { table: 'Ingredient' } ]
```

## Changelog

See changelog.md

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/toposort-extended/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add an entry to changelog
* add tests for new features
* document new functionality/API additions in README
