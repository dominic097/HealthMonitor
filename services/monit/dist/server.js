"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const mongoose = require("mongoose");
const sysConfig_1 = require("./config/sysConfig");
const scheduler_controller_1 = require("./scheduler//scheduler.controller");
const app_1 = require("./app");
// const app = require('./app');
const mongoUri = sysConfig_1.default.mongo.host;
const port = sysConfig_1.default.port || '3000';
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
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
const server = http_1.createServer(app_1.default);
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
    scheduler_controller_1.default.init();
});
server.listen(port, (err) => {
    console.log(err || 'app running in ', server.address());
});
//# sourceMappingURL=server.js.map