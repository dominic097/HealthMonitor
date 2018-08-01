import { httpAdaptor } from '../utils';

class HealthController {
  constructor(config) {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    if (this.apiConfig.length) {
      httpAdaptor(conf).then(this.updateHealthInfo)

    }
  }

  updateHealthInfo(i) {

  }
}

