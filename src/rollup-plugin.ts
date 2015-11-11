//interface documenting the rollup plugin API

export interface TransformResult {
  code:string;
  map:string;
  originalCode:string;
}

export interface RollupPluginOptions {
  include?: string[];
  exclude?: string[];
}

export interface RollupPlugin {
  load?(id:string): string;
  resolveExternal?(id:string):string;
  resolveId?(importer: string, importee:string):string;
  transform?(source:string, id:string): string | TransformResult;
  intro?(): string;
  outro?(): string;
  banner?(): string;
  footer?(): string;
}