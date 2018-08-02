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
    doc.dataCenter = doc.serviceName;

    const model = db(doc.dataCenter);

    model.updateHealth(doc, ((err, r) => {
      if (err) throw new Error(err);
      console.log(r);
    }));

    console.log(res.data);
  }

  static getDataCenter() {
    //  TO DO Read collection list from DB
    const cmap = {};
    config.forEach((c) => {
      cmap[c.dataCenter] = '';
    });
    return Object.keys(cmap);
  }

  static getHealthInfo() {
    return new Promise((resolve) => {
      const dcList = this.getDataCenter().map((datacenter) => {
        return this.getHealthInfoByDC(datacenter);
      });

      Promise.all(dcList)
        .then((err, data) => {
          if (err) throw new Error(err);
          resolve(data);
        });
    });
  }

  static getHealthInfoByDC(dc) {
    return new Promise((resolve) => {
      const model = db(dc);
      model.findByDataCenter(dc, (err, data) => {
        if (err) throw new Error(err);
        const healthIn = data.length ? data[0].toJSON() : {};
        resolve(healthIn);
      });
    });
  }
}

module.exports = HealthController;

