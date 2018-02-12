import { InstancePlugin } from 'csv-wealth-api';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { Record } from './entities';

const entities: Function[] = [Record];

type OptionalConnectionOptions = ConnectionOptions | null;
type OptionalConnection = Connection | null;

let connection: OptionalConnection = null;
let options: OptionalConnectionOptions = null;

const newConnection = async (connectionOptions: ConnectionOptions) => {
  const opts = {
    ...connectionOptions,
    entities,
  };
  console.info('Creating new connection...');
  const conn = await createConnection(opts);

  connection = conn;
  options = opts;

  return conn;
};

export const getConnection = (): Promise<Connection> => connection
  ? Promise.resolve(connection)
  : newConnection(options as ConnectionOptions);

const initConnection: InstancePlugin = async (params) => {
  params.connection = await newConnection(params.config.db);

  console.log(`Connected to database "${params.config.db.type}"`);

  return params;
};

export default initConnection;
