import { Context } from 'koa';
import { convertCSV } from '../utils';
import { getClient } from '../db';

export default async (ctx: Context) => {
  const records = await convertCSV(ctx.request.body);
  const client = await getClient();

  const collection = client.collection('records');
  await (() => new Promise((resolve, reject) => {
    collection.insertMany(records, (error, result) => {
      if (!error) {
        console.log('Saved successfully =', result);
        ctx.body = 'Success';
        resolve();
      } else {
        console.log('Error', error.stack);
        ctx.body = 'Error';
        reject();
      }
    });
  }))();
};
