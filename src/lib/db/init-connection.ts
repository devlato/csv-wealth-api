import * as Mongo from 'mongodb';
import { InstancePlugin } from 'csv-wealth-api';

const initConnection: InstancePlugin = (params) => {
  Mongo.connect(params.config.db.url);

  return params;
};

export default initConnection;
