const httpAdaptor = require('../utils');
const config = require('./health.config.js');

class HealthController {
  constructor() {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    let self = this;
    return this.apiConfig.map((conf) => {
      return httpAdaptor(conf).then(self.updateHealthInfo).catch((error) => {
        console.log(error);
      });
    });
  }

  updateHealthInfo(res) {
    if (res.status === 200)
      console.log(res);
  }
}

module.exports = HealthController;

