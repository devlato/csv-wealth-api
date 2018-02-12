import { Context } from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { Configuration, InstancePlugin } from 'csv-wealth-api';
import { uploadCSV } from './index';

const bodyParsedMiddleware = bodyParser({
  enableTypes: ['json', 'text', 'form'],
  extendTypes: {
    json: ['application/javascript'],
    text: ['text/csv'],
  },
  onerror: (error: Error, ctx: Context) => {
    ctx.throw(error.stack as string, 422);
  },
});

const bindRoutes = (router: Router, config: Configuration) =>
  router
    .post('/csv/upload', bodyParsedMiddleware, uploadCSV(config));
    // .get('/csv', getCSV);

const addRoutes: InstancePlugin = async (params) => {
  params.instance.use(bindRoutes(new Router(), params.config).routes());

  console.log('Routes assigned');

  return params;
};

export default addRoutes;
