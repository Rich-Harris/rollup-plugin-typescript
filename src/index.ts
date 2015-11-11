//gets TS to shut up
declare var require:any;
declare var __dirname:string;

const path = require( 'path' );
const process = require('process');
import * as ts from 'typescript';
import {RollupPlugin, RollupPluginOptions} from './rollup-plugin';
const {createFilter} = require('rollup-pluginutils');

export function typescript (
  options:RollupPluginOptions = {},
  compilerOptions:ts.CompilerOptions = { target: ts.ScriptTarget.ES6,  }
  ): RollupPlugin {
    
    const filter = createFilter( options.include, options.exclude );
    
    return {
      resolveId(filePath, importedFrom){
       if(!importedFrom){
         return path.resolve(filePath);
       }
       //TODO: node resolution
       filePath = path.resolve(path.dirname(importedFrom), filePath);
       if(path.extname(filePath) === ''){
         filePath += '.ts';
       }
       return filePath;
      },
      transform(originalCode:string, id){
        
        let fileInfo = ts.preProcessFile(originalCode);
        
        let es6code =  ts.transpileModule(originalCode, { compilerOptions: {
          target: ts.ScriptTarget.ES5,
          module: ts.ModuleKind.ES6
         }});
        
        return {
          code: es6code.outputText,
          originalCode: originalCode,
          map: es6code.sourceMapText
        }
      }
    };
}
