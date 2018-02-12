import { Context } from 'koa';
import { Configuration } from 'csv-wealth-api';
import { convertCSV } from '../utils';
import { getClient } from '../db';

export default (config: Configuration) => async (ctx: Context) => {
  const records = await convertCSV(ctx.request.body);
  const client = await getClient();

  const collection = client.collection('records');
  collection.insertMany(records, (error, result) => {
    if (!error) {
      console.log('Saved successfully =', result);
      ctx.body = 'Success';
    } else {
      console.log('Error', error.stack);
      ctx.body = 'Error';
    }
  });
};
