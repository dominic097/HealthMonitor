import HealthController from './../modules/health/health.controller';
import { appConfig } from './../config/';
import Lock from './scheduler.lock';

const healthController = new HealthController();

const scheduler = () => {
  const schedulerID = appConfig.nodeId;
  healthController.collectHealthInfo();
  console.log(`schedulerID::  + ${schedulerID}`);
};

export default {
  init: () => {
    const healthInterval = setInterval(() => {
      const __lock__ = new Lock('scheduler', {
        timeout: appConfig.intervalTime * 1,
      });
      __lock__.acquire((err, lockAcquired) => {
        console.log(lockAcquired);
        if (err) {
          return console.error(err);
        } else if (lockAcquired) {
          scheduler();
        }
      });
    }, appConfig.intervalTime);
  }
};

