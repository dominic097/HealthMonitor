const httpAdaptor = require('../utils');
const config = require('./health.config.js');
const db = require('./health.model.js');
const mongoose = require('mongoose');


class HealthController {
  constructor() {
    this.apiConfig = config;
  }

  collectHealthInfo() {
    const self = this;
    return this.apiConfig.map((conf) => {
      return httpAdaptor(conf).then(self.updateHealthInfo).catch((e) => {
        self.updateHealthInfo({
          uid: e.err.serviceName,
          data: e.err.data || {},
          status: e.status,
        });
      });
    });
  }

  updateHealthInfo(res) {
    let data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    let doc = {
      serviceName: data.uid || res.uid,
      lastUpdatedTime: Date.now(),
      status: data.status || res.status,
    };

    // assuming dataCenter to be serviceName for now ...
    doc.dataCenterName = doc.serviceName;

    const model = db(doc.dataCenterName);

    model.updateHealth(doc, ((err, r) => {
      if (err) throw new Error(err);
      console.log(r);
    }));

    console.log(res.data);
  }

  static getDataCenter() {
    return Promise((resolve, reject) => {
      mongoose.getCollectionNames((err, dcLst) => {

      });

    });
  }

  static getHealthInfoByDC(dc) {
    return new Promise((resolve, reject) => {
      const model = db(dc);
      model.findByDataCenter(dc, (err, data) => {
        if (err) throw new Error(err);
        resolve(Data);
      });
    });
  }
}

module.exports = HealthController;

