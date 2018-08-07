import HealthController from './../health/health.controller';
import config from './../config/sysConfig';
import Lock from './scheduler.lock';

const healthController = new HealthController();

const scheduler = () => {
  const schedulerID = config.nodeId;
  healthController.collectHealthInfo();
  console.log(`schedulerID::  + ${schedulerID}`);
};

export default {
  init: () => {
    const healthInterval = setInterval(() => {
      const __lock__ = new Lock('scheduler', {
        timeout: config.intervalTime * 1,
      });
      __lock__.acquire((err, lockAcquired) => {
        console.log(lockAcquired);
        if (err) {
          return console.error(err);
        } else if (lockAcquired) {
          scheduler();
        }
      });
    }, config.intervalTime);
  }
};

