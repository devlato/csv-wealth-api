declare module 'csv-wealth-api' {
  import * as Koa from 'koa';

  export interface Configuration {
    instance: {
      host: string;
      port: string;
    };
    db: {
      url: string;
    };
  }

  export type Instance = Koa;

  export interface InstancePluginOptions {
    instance: Instance;
    config: Configuration;
  }

  export type InstancePlugin = (options: InstancePluginOptions) => InstancePluginOptions;
}
