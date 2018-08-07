import { Server, createServer } from 'http';
import * as mongoose from 'mongoose';
import config from './config/sysConfig';
import scheduler from './scheduler//scheduler.controller';
import app from './app';

// const app = require('./app');

const mongoUri = config.mongo.host;
const port = config.port || '3000';

function onError(error) {
  if (error.syscall !== 'listen') { throw error; }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const server = createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${port}` : `Port ${port}`;
  console.log(`Listening on ${bind}`);
  console.log(addr);
}

server.on('error', onError);
server.on('listening', onListening);

mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
mongoose.connection.once('open', () => {
  console.log("mongodb connection open");
  scheduler.init();
});


server.listen(port, (err) => {
  console.log(err || 'app running in ', server.address());
});

