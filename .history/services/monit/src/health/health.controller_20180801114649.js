// const httpAdaptor = require('../utils/httpAdapter.js');

import { httpAdaptor } from '../utils';

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

