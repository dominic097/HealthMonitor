"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_config_1 = require("./health.config");
const health_model_1 = require("./health.model");
const httpAdapter_1 = require("../utils/httpAdapter");
class HealthController {
    constructor() {
        this.apiConfig = health_config_1.default;
    }
    collectHealthInfo() {
        const self = this;
        return this.apiConfig.map((conf) => {
            return httpAdapter_1.default(conf).then(self.updateHealthInfo).catch((e) => {
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
        const model = health_model_1.default(doc.dataCenter);
        return model.updateHealth(doc);
        // console.log(res.data);
    }
    static getDataCenter() {
        //  TO DO Read collection list from DB
        const cmap = {};
        health_config_1.default.forEach((c) => {
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
            const model = health_model_1.default(dc);
            model.findByDataCenter(dc, (err, data) => {
                if (err)
                    throw new Error(err);
                let healthStats = [];
                if (data.length) {
                    healthStats = data.map(d => d.toJSON());
                }
                resolve(healthStats);
            });
        });
    }
}
exports.default = HealthController;
//# sourceMappingURL=health.controller.js.map