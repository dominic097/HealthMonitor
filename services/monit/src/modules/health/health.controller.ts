import { healthConfig, dataCenter, appConfig } from './../../config';
import db from './health.model';
import * as mongoose from 'mongoose';
import { httpAdaptor } from '../../utils/';
import BaseController from '../health.base';


class HealthController extends BaseController {
  apiConfig;
  constructor() {
    super(db, dataCenter);
    this.apiConfig = healthConfig;
  }

  collectHealthInfo = () => {
    const self = this;
    return this.apiConfig.map((conf) => {
      return httpAdaptor(conf).then(self.update.bind(this)).catch((e) => {
        self.update({
          uid: e.err.serviceName,
          data: e.err.data || {},
          status: e.status,
        });
      });
    });
  }
}

export default HealthController;

