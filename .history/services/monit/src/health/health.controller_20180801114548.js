const httpAdaptor = require('../utils/httpAdapter.js');
class HealthController {
  constructor(config) {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    if (this.apiConfig.length) {

    }
  }

  promisifyAll() {
    this.apiConfig.map((conf) => {
      return httpAdaptor(conf);
    });
  }
}

