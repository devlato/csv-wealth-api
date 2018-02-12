import { Context } from 'koa';
import { CSVData } from '../utils';
import { getClient } from '../db';

export default async (ctx: Context) => {
  const init = parseInt(ctx.query.init, 10);
  const end = parseInt(ctx.query.end, 10);
  const client = await getClient();

  const collection = client.collection('records');
  await (() => new Promise((resolve, reject) => {
    collection.find({
      year: {
        $gt: init,
        $lte: end,
      },
    })
      .toArray((error: Error, results: CSVData) => {
        if (!error) {
          console.log('Saved successfully =', results);
          ctx.body = JSON.stringify(results);
          resolve();
        } else {
          console.log('Error', error.stack);
          ctx.body = 'Error';
          reject();
        }
      },
    );
  }))();
};
