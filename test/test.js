var assert = require('assert');
var rollup = require('rollup');
var typescriptPlugin = require('../dist/cjs/index').typescript;
var System = require('systemjs');

describe('rollup-plugin-typescript', function () {
  
  beforeEach(function(){
    System.config({
      transpiler: 'typescript',
      map: {
        typescript: './node_modules/typescript/lib/typescript.js' }
     });
  });
  
  it('runs a single file through typescript', function () {
    
    return rollup.rollup({
      entry: './test/samples/basic/main.ts',
      plugins: [typescriptPlugin()]
    }).then(function (bundle) {
      return bundle.write({
        dest: './temp/basic/main.js'
      })
    }).then(function(written){
      return System.import('./temp/basic/main.js')
    }).then(function(Greeter){
      var greeter = new Greeter('hello world');
      console.assert(greeter.greet() === 'hello world!!!');
    })
  });
  
  it('runs multiple files through typescript and bundles them', function () {
    
    return rollup.rollup({
      entry: './test/samples/app/main.ts',
      plugins: [typescriptPlugin()]
    }).then(function (bundle) {
      return bundle.write({
        dest: './temp/app/main.js'
      });
    }).then(function(written){
      return System.import('./temp/app/main.js')
    }).then(function(mod){
      console.assert(mod.result === 'foo');
    });
  });
});
