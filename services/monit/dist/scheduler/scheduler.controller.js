"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_controller_1 = require("./../modules/health/health.controller");
const config_1 = require("./../config/");
const scheduler_lock_1 = require("./scheduler.lock");
const healthController = new health_controller_1.default();
const scheduler = () => {
    const schedulerID = config_1.appConfig.nodeId;
    healthController.collectHealthInfo();
    console.log(`schedulerID::  + ${schedulerID}`);
};
exports.default = {
    init: () => {
        const healthInterval = setInterval(() => {
            const __lock__ = new scheduler_lock_1.default('scheduler', {
                timeout: config_1.appConfig.intervalTime * 1,
            });
            __lock__.acquire((err, lockAcquired) => {
                console.log(lockAcquired);
                if (err) {
                    return console.error(err);
                }
                else if (lockAcquired) {
                    scheduler();
                }
            });
        }, config_1.appConfig.intervalTime);
    }
};
//# sourceMappingURL=scheduler.controller.js.map