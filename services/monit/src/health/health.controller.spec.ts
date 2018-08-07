import * as mongoose from 'mongoose';
import db from './../health/health.model';
import config from '../config/sysConfig';
import HealthController from './../health/health.controller';


const healthController = new HealthController();
const mongoUri = config.mongo.host;
const dataCenterName = 'test-service';
const testData = {
  dataCenter: dataCenterName,
  data: '{"status":"ok","uid":"test-service"}',
}

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
    healthController.updateHealthInfo(testData)
      .then((res) => {
        done();
      });
  });

  it('get health info by DC', (done) => {
    HealthController.getHealthInfoByDC(dataCenterName).then((res: Array<any>) => {
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
    HealthController.getHealthInfo().then((res: Array<any>) => {
      if (res.length > 0) {
        done();
      }
    });
  });

  it('get DC list from config ', (done) => {
    const dclist = HealthController.getDataCenter();
    if (dclist.length > 0 ) {
      done();
    }
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      mongoose.connection.close(done);
    });
  });
});