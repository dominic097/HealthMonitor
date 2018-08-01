const httpAdaptor = require('../utils');
const config = require('./health.config.js');
const db = require('./health.model.js');

const STATUS_CODE = 200;
class HealthController {
  constructor() {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    const self = this;
    return this.apiConfig.map((conf) => {
      return httpAdaptor(conf).then(self.updateHealthInfo).catch((error) => {
        console.log(error);
      });
    });
  }

  updateHealthInfo(res) {
    let data = JSON.parse(res.data);
    let doc = {
      serviceName: data.uid,
      lastUpdatedTime: Date.now,
      status: data.status,
    };
    const model = db(data.uid);

    model.updateHealth(data, ((err, r) => {
      if (err) throw new Error(err);
      console.log(r);
    }));
    console.log(res.data);
  }
}

module.exports = HealthController;
