import * as ts from 'typescript';
import { createFilter } from 'rollup-pluginutils';

export default function typescript ( options = {} ) {
	const filter = createFilter( options.include, options.exclude );

	return {
		transform ( code, id ) {
			if ( !filter( id ) ) return;
			if ( !/\.ts$/.test( id ) ) return;

			return ts.transpile( code );
		}
	};
}
