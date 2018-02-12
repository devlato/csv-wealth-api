declare module 'csv-wealth-api' {
  import * as Koa from 'koa';
  import { MongoClient } from 'mongodb';

  export type Connection = MongoClient;
  export interface ConnectionOptions {
    url: string;
    dbname: string;
  }

  export interface Configuration {
    instance: {
      host: string;
      port: number;
    };
    db: ConnectionOptions;
  }

  export type Instance = Koa;

  export interface InstancePluginOptions {
    instance: Instance;
    config: Configuration;
    connection?: Connection;
  }

  export type InstancePluginResult = Promise<InstancePluginOptions> | InstancePluginOptions;

  export type InstancePlugin = (options: InstancePluginOptions) => InstancePluginResult;
}
