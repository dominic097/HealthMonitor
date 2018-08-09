import * as request from 'supertest';
import * as mongoose from 'mongoose';
import app from './app';
import { appConfig } from './config/';
import HealthController from './modules/health/health.controller';

const healthController = new HealthController();
const mongoUri = appConfig.mongo.host;
const dataCenterName = 'test-service';
const testData = {
  dataCenter: dataCenterName,
  data: '{"status":"ok","uid":"test-service"}',
}

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
    request(app).get('/')
      .expect(404)
      .end(function (err, res) {
        done();
      });
  });

  it('get service health', (done) => {
    request(app).get('/monit/health')
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });

  it('get all health status', (done) => {
    request(app).get('/monit/')
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });

  it(`get health  by dc ${dataCenterName}`, (done) => {
    request(app).get(`/monit/${dataCenterName}`)
      .expect(200)
      .end(function (err, res) {
        done();
      });
  });
});