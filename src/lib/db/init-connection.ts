import { Connection, ConnectionOptions, InstancePlugin } from 'csv-wealth-api';
import { MongoClient } from 'mongodb';

type OptionalConnectionOptions = ConnectionOptions | null;
type OptionalConnection = Connection | null;

let connection: OptionalConnection = null;
let options: OptionalConnectionOptions = null;

const newConnection = async (connectionOptions: ConnectionOptions) => {
  const conn = await MongoClient.connect(connectionOptions.url);

  connection = conn;
  options = connectionOptions;

  return conn;
};

export const getConnection = (): Promise<Connection> => connection
  ? Promise.resolve(connection)
  : newConnection(options as ConnectionOptions);

const initConnection: InstancePlugin = async (params) => {
  params.connection = await newConnection(params.config.db);

  console.log(`Connected to database ${params.config.db.url} (${params.config.db.dbname})`);

  return params;
};

export const getClient = async () =>
  (await getConnection()).db((options as ConnectionOptions).dbname);

export default initConnection;
