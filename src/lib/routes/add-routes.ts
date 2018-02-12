import { Context } from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { InstancePlugin } from 'csv-wealth-api';
import { uploadCSV, getTop10 } from './index';

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

const bindRoutes = (router: Router) =>
  router
    .post('/csv/upload', bodyParsedMiddleware, uploadCSV)
    .get('/top10', getTop10);

const addRoutes: InstancePlugin = async (params) => {
  params.instance.use(bindRoutes(new Router()).routes());

  console.log('Routes assigned');

  return params;
};

export default addRoutes;
