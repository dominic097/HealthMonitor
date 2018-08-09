"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./../../config");
const health_model_1 = require("./health.model");
const utils_1 = require("../../utils/");
const health_base_1 = require("../health.base");
class HealthController extends health_base_1.default {
    constructor() {
        super(health_model_1.default, config_1.dataCenter);
        this.collectHealthInfo = () => {
            const self = this;
            return this.apiConfig.map((conf) => {
                return utils_1.httpAdaptor(conf).then(self.update.bind(this)).catch((e) => {
                    self.update({
                        uid: e.err.serviceName,
                        data: e.err.data || {},
                        status: e.status,
                    });
                });
            });
        };
        this.apiConfig = config_1.healthConfig;
    }
}
exports.default = HealthController;
//# sourceMappingURL=health.controller.js.map