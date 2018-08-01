const HealthController = require('./../health/health.controller');
const config = require('./../config/sysConfig');
const Lock = require('./scheduler.lock.js');

const healthController = new HealthController();


const scheduler = () => {
  const schedulerID = config.nodeId;
  healthController.collectHealthInfo();
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

