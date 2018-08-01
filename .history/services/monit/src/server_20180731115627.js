const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/sysConfig');
const scheduler = require('./scheduler/scheduler.controller.js');

const mongoUri = config.mongo.host;
const port = config.port || '3000';

// app.listen(port);

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

const server = http.Server(app);

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

