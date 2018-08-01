const httpAdaptor = require('../utils');
const config = require('./health.config.js');

class HealthController {
  constructor() {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    return this.apiConfig.map((conf) => {
      return httpAdaptor(conf).then(this.updateHealthInfo).catch((error) => {
        console.log(error);
      });
    });
  }

  static updateHealthInfo(err, res) {
    if (err) console.error(err);
    console.log(res);
  }
}

module.exports = HealthController;
