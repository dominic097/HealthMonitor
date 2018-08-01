export class HealthController {
  apiConfig: Array<any>;

  constructor(config: Array<any>) {
    this.apiConfig = config;
  }

  collectHealthInfo: function () {
    if(this.apiConfig.length) {

    }
  }
}

