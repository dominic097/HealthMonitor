"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor(model, dataCenter) {
        this.get = (dc) => {
            return new Promise((resolve) => {
                if (dc) {
                    const model = this.db(dc);
                    model.findByDataCenter(dc, (err, data) => {
                        if (err)
                            throw new Error(err);
                        let healthStats = [];
                        if (data.length) {
                            healthStats = data.map(d => d.toJSON());
                        }
                        resolve(healthStats);
                    });
                }
                else {
                    const dcList = this.dataCenter.map((datacenter) => {
                        return this.get(datacenter);
                    });
                    Promise.all(dcList)
                        .then((data) => {
                        resolve({
                            status: 'sucess',
                            data,
                        });
                    });
                }
            });
        };
        this.update = (res) => {
            let data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            let doc = {
                serviceName: data.uid || res.uid,
                lastUpdatedTime: Date.now(),
                status: data.status || res.status,
                dataCenter: '',
            };
            // assuming dataCenter to be serviceName for now ...
            doc.dataCenter = data.dataCenter || doc.serviceName;
            const model = this.db(doc.dataCenter);
            return model.updateHealth(doc);
        };
        this.db = model;
        this.dataCenter = dataCenter;
    }
}
exports.default = BaseController;
//# sourceMappingURL=health.base.js.map