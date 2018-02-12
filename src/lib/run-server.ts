import { Configuration, InstancePlugin } from 'csv-wealth-api';
import * as Koa from 'koa';
import { flowRight as compose } from 'lodash';
import { addRoutes } from './routes';
import { initConnection } from './db';

const init = compose([
  initConnection,
  addRoutes,
]) as InstancePlugin;

export default async (config: Configuration) => new Promise(async (resolve, reject) => {
  try {
    const instance = new Koa();

    init({ instance, config })
      .instance
      .listen(config.instance.port, () => {
        resolve();
      });
  } catch (e) {
    reject(e);
  }
});
