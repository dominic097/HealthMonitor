const httpAdaptor = require('../utils');
const config = require('./health.config.js');
const model = require('./health.model.js');

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
    model.udpate({
      serviceName: { type: String },
      lastUpdatedTime: { type: Date },
      retryCount: { type: Number, default: 0 },
      status: { type: String },
      history: { type: [statusSchema] },
    });
    console.log(res.data);
  }

module.exports = HealthController;

