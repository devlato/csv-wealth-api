import { Context } from 'koa';
import { Configuration } from 'csv-wealth-api';

export default (config: Configuration) => async (ctx: Context) => {
  ctx.body = `Hello + ${config.instance.port}!`;
};
