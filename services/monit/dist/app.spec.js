"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const mongoose = require("mongoose");
const app_1 = require("./app");
const config_1 = require("./config/");
const health_controller_1 = require("./modules/health/health.controller");
const healthController = new health_controller_1.default();
const mongoUri = config_1.appConfig.mongo.host;
const dataCenterName = 'test-service';
const testData = {
    dataCenter: dataCenterName,
    data: '{"status":"ok","uid":"test-service"}',
};
describe('health monit API test ', () => {
    before((done) => {
        mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });
    it('expected 404', (done) => {
        request(app_1.default).get('/')
            .expect(404)
            .end(function (err, res) {
            done();
        });
    });
    it('get service health', (done) => {
        request(app_1.default).get('/monit/health')
            .expect(200)
            .end(function (err, res) {
            done();
        });
    });
    it('get all health status', (done) => {
        request(app_1.default).get('/monit/')
            .expect(200)
            .end(function (err, res) {
            done();
        });
    });
    it(`get health  by dc ${dataCenterName}`, (done) => {
        request(app_1.default).get(`/monit/${dataCenterName}`)
            .expect(200)
            .end(function (err, res) {
            done();
        });
    });
});
//# sourceMappingURL=app.spec.js.map