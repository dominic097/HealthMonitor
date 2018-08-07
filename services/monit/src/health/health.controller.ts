import config from './health.config';
import db from './health.model';
import * as mongoose from 'mongoose';
import httpAdaptor from '../utils/httpAdapter';


class HealthController {
  apiConfig;
  dataCenter;
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
      dataCenter: '',
    };

    // assuming dataCenter to be serviceName for now ...
    doc.dataCenter = data.dataCenter || doc.serviceName;
    // console.log(res);
    // console.log(doc);
    const model = db(doc.dataCenter);

    return model.updateHealth(doc);

    // console.log(res.data);
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
        .then((data) => {
          resolve(data);
        });
    });
  }

  static getHealthInfoByDC(dc) {
    return new Promise((resolve) => {
      const model = db(dc);
      model.findByDataCenter(dc, (err, data) => {
        if (err) throw new Error(err);
        let healthStats = [];
        if (data.length) {
          healthStats = data.map(d => d.toJSON());
        }
        resolve(healthStats);
      });
    });
  }
}

export default HealthController;

