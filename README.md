# toposort-extended.js

# toposort with objects

## What it does

An extension of (toposort)[https://github.com/marcelklehr/toposort] where the inputs can be objects.

	var toposort = require('toposort-extended');
	
	sorted = toposort([
		[{table: 'Ingredient'}, {table: 'Shop'}],
		[{table: 'Food'}, {table: 'Ingredient'}]
	]);
	
	// returns [ { table: 'Food' }, { table: 'Ingredient' }, { table: 'Shop' } ]

## Changelog

See changelog.md

## Tests

None! It's so simple, it doesn't really need them.

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/toposort-extended/issues
