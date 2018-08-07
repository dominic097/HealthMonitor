"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_controller_1 = require("./../health/health.controller");
const sysConfig_1 = require("./../config/sysConfig");
const scheduler_lock_1 = require("./scheduler.lock");
const healthController = new health_controller_1.default();
const scheduler = () => {
    const schedulerID = sysConfig_1.default.nodeId;
    healthController.collectHealthInfo();
    console.log(`schedulerID::  + ${schedulerID}`);
};
exports.default = {
    init: () => {
        const healthInterval = setInterval(() => {
            const __lock__ = new scheduler_lock_1.default('scheduler', {
                timeout: sysConfig_1.default.intervalTime * 1,
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
        }, sysConfig_1.default.intervalTime);
    }
};
//# sourceMappingURL=scheduler.controller.js.map