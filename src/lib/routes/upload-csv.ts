import { Context } from 'koa';
import { Configuration } from 'csv-wealth-api';
import { convertCSV, CSVData } from '../utils';
import { Record } from '../db/entities';
import { getConnection } from '../db';

const convertToRecords = (rows: CSVData): Record[] =>
  rows.map((row) => {
    const record = new Record();

    record.year = row.year;
    record.wealthTop10 = row.wealthTop10;
    record.incomeTop10 = row.incomeTop10;
    record.wealthBottom50 = row.wealthBottom50;
    record.incomeBottom50 = row.incomeBottom50;

    return record;
  });

export default (config: Configuration) => async (ctx: Context) => {
  const records = convertToRecords(await convertCSV(ctx.request.body));
  const connection = await getConnection();

  await connection.mongoManager.save(records);

  ctx.body = `Hello + ${config.instance.port}!`;
};
