const httpAdaptor = require('../utils')
const config = require('./health.config.js');
class HealthController {
  constructor() {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    if (this.apiConfig.length) {
      httpAdaptor(conf).then(this.updateHealthInfo).catch((error) => {
        console.log(error);
      });
    }
  }

  static updateHealthInfo(err, res) {
    if (err) console.error(err);
    console.log(res);
  }
}

export default HealthController;
