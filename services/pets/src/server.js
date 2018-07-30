const http = require('http');

const app = require('./app');

const port = process.env.PORT || '3000';

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

server.listen(port, (err) => {
  console.log(err || 'app running in ', server.address());
});

