import { HealthController } from './../health/health.controller';

const config = require('./../config/sysConfig');
const Lock = require('./scheduler.lock.js');

const scheduler = () => {
  const schedulerID = config.nodeId;
  const healthController = new HealthController();

}

module.exports = {
  init: () => {
    const healthInterval = setInterval(() => {
      const __lock__ = new Lock('scheduler', {
        timeout: config.intervalTime * 3,
      });
      __lock__.acquire((err, lockAcquired) => {
        console.log(lockAcquired);
        if (err) {
          return console.error(err)
        }
        else if (lockAcquired) {
          scheduler();
        }
      });
    }, config.intervalTime);
  }
};

