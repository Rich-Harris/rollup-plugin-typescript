var assert = require( 'assert' );
var rollup = require( 'rollup' );
var typescriptPlugin = require( '..' );

process.chdir( __dirname );

describe( 'rollup-plugin-typescript', function () {
	it( 'runs code through typescript', function () {
		return rollup.rollup({
			entry: 'samples/basic/main.ts',
			plugins: [ typescriptPlugin() ]
		}).then( function ( bundle ) {
			var generated = bundle.generate();
			var code = generated.code;

			console.log( 'code', code )

			var fn = new Function( 'module', code );
			var module = {};
			fn( module );

			assert.equal( module.exports, '<h1>Hello, world!</h1>', code );
		});
	});
});
