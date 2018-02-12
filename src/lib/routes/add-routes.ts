import * as Router from 'koa-router';
import { Configuration, InstancePlugin } from 'csv-wealth-api';
import { uploadCSV } from './index';

const bindRoutes = (router: Router, config: Configuration) =>
  router
    .post('/csv/upload', uploadCSV(config));
    // .get('/csv', getCSV);

const addRoutes: InstancePlugin = (params) => {
  params.instance.use(bindRoutes(new Router(), params.config).routes());

  return params;
};

export default addRoutes;
