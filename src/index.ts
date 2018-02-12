import 'reflect-metadata';
import { Configuration } from 'csv-wealth-api';
import runServer from './lib/run-server';

const config = require('../configuration') as Configuration;

process.on('uncaughtException', (e) => {
  console.log('Uncaught exception happened');
  console.error(e.stack);
  process.exit(-1);
});

(async () => {
  try {
    await runServer(config);

    console.log(`Server is running on port ${config.instance.port}`);
  } catch (e) {
    console.log(`Cannot run server on port = ${config.instance.port}`);
    console.error(e.stack);
  }
})();
