import * as csvToJSON from 'csvtojson';

type ComposeArgument<ParamsType> = (options: ParamsType) => ParamsType | Promise<ParamsType>;

export const compose = <ParamsType>(...fns: ComposeArgument<ParamsType>[]) =>
  async (params: ParamsType) => fns.reduce(
    (promise: Promise<ParamsType>, fn) => promise.then(result => fn(result)),
    Promise.resolve(params),
  );

export type CSVRowRaw = string[];
export type CSVRaw = CSVRowRaw[];

export interface CSVRecord {
  year: number;
  incomeTop10: number;
  wealthTop10: number;
  incomeBottom50: number;
  wealthBottom50: number;
  [key: string]: number;
}
export type CSVData = CSVRecord[];

interface IncomingKeysToAttributes {
  year: string;
  'income top 10': string;
  'wealth top 10': string;
  'income bottom 50': string;
  'wealth bottom 50': string;
  [key: string]: string;
}

const incomingKeysToAttributes: IncomingKeysToAttributes = {
  year: 'year',
  'income top 10': 'incomeTop10',
  'wealth top 10': 'wealthTop10',
  'income bottom 50': 'incomeBottom50',
  'wealth bottom 50': 'wealthBottom50',
};

export const convertIncomingKeyToAttribute = (key: string) => incomingKeysToAttributes[key];

const prepareCSV = (source: string) =>
  (source || '')
    .replace(/;/ig, ',')
    .replace(/\\r/ig, '')
    .replace(/\\n/ig, '\n');

export const parseCSV = async (source: string) =>
  new Promise(async (resolve, reject) => {
    const rows: CSVRaw = [];

    csvToJSON({ noheader: true })
      .fromString(prepareCSV(source))
      .on('csv', (row: CSVRowRaw) => {
        rows.push(row);
      })
      .on('done', () => {
        resolve(rows);
      })
      .on('error', (error: Error) => {
        reject(error);
      });
  });

const convertLines = (values: CSVRaw): CSVData => {
  const [header, ...rows] = values;

  return rows.map(row =>
    row.reduce(
      (memo, cell, i) => {
        const attributeName = convertIncomingKeyToAttribute(header[i]);

        memo[attributeName] = parseFloat(cell);
        return memo;
      },
      {} as CSVRecord,
    ));
};

export const convertCSV = async (source: string) => {
  const parsed = await parseCSV(source) as CSVRaw;

  return convertLines(parsed);
};
