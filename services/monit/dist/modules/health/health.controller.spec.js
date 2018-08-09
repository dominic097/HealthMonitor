"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config_1 = require("../../config/");
const health_controller_1 = require("./../health/health.controller");
const healthController = new health_controller_1.default();
const mongoUri = config_1.appConfig.mongo.host;
const dataCenterName = 'test-service';
const testData = {
    dataCenter: dataCenterName,
    data: '{"status":"ok","uid":"test-service"}',
};
describe('health-controller-test', () => {
    before(function (done) {
        mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
        mongoose.connection.on('error', console.error.bind(console, 'connection error'));
        mongoose.connection.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });
    it('create-dc-stat-test', (done) => {
        healthController.update(testData)
            .then((res) => {
            done();
        });
    });
    it('get health info by DC', (done) => {
        healthController.get(dataCenterName).then((res) => {
            if (res.length > 0 && res[0].dataCenter == dataCenterName) {
                done();
            }
        });
    });
    it('collect all health info', (done) => {
        const h = healthController.collectHealthInfo();
        if (h.length > 0) {
            done();
        }
    });
    it('get all micro service health info', (done) => {
        healthController.get().then((res) => {
            console.log('res----');
            console.log(res);
            if (res.length > 0) {
                done();
            }
        });
    });
    it('get DC list from config ', (done) => {
        const dclist = healthController.dataCenter;
        if (dclist.length > 0) {
            done();
        }
    });
    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            mongoose.connection.close(done);
        });
    });
});
//# sourceMappingURL=health.controller.spec.js.map