# toposort-extended.js

# toposort with objects

## What it does

An extension of [toposort](https://github.com/marcelklehr/toposort) where the inputs can be objects.

## Current status

API is stable and no known issues.

## Usage

### Main method
#### toposort(edges)

	var toposort = require('toposort-extended');
	
	sorted = toposort( [
		[ { table: 'Ingredient' }, { table: 'Shop' } ],
		[ { table: 'Food' }, { table: 'Ingredient' } ]
	] );
	
	// sorted = [ { table: 'Food' }, { table: 'Ingredient' }, { table: 'Shop' } ]

Exactly the same as original [toposort](https://github.com/marcelklehr/toposort), except:

* Inputs are converted to JSON before ordering so objects can be used as input
* Cyclic dependency errors are thrown as custom class `toposort.Error` with the source of the error passed as `edge`

#### toposort.dependents(edges)

Same as `toposort(edges)` except that items which are not dependent on any other item are excluded from the returned array.

	sorted = toposort.dependents( [
		[ { table: 'Ingredient' }, { table: 'Shop' } ],
		[ { table: 'Food' }, { table: 'Ingredient' } ]
	] );

	// sorted = [ { table: 'Food' }, { table: 'Ingredient' } ]

## Changelog

See changelog.md

## Tests

None! It's so simple, it doesn't really need them.

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/toposort-extended/issues
