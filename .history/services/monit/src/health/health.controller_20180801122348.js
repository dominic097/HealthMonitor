import { httpAdaptor } from '../utils';

class HealthController {
  constructor(config) {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    if (this.apiConfig.length) {
      httpAdaptor(conf).then(this.updateHealthInfo).catch((error) => {
        console.log(error);
      });
    }
  }

  updateHealthInfo(i) {
    console.log(i);
  }
}

