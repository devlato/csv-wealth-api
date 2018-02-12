import { Configuration, InstancePlugin, InstancePluginOptions } from 'csv-wealth-api';
import * as Koa from 'koa';
import { compose } from './utils';
import { addRoutes } from './routes';
import { initConnection } from './db';

const startListening: InstancePlugin = async params =>
  new Promise<InstancePluginOptions>(async (resolve, reject) => {
    try {
      params.instance.listen(params.config.instance.port, () => {
        resolve(params);
      });
    } catch (e) {
      reject(e);
    }
  });

const init = compose<InstancePluginOptions>(
  initConnection,
  addRoutes,
  startListening,
);

export default async (config: Configuration) => {
  await init({
    config,
    instance: new Koa(),
  });
};
