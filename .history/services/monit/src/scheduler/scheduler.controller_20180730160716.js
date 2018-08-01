const config = require('./../config/sysConfig')
const Lock = require('./scheduler.lock.js');

const __lock__ = new Lock('scheduler', {
  timeout: config.intervalTime,
});

const scheduler = () => {
  const schedulerID = config.nodeId;
  console.log(`Scheduler ID: ${schedulerID}`);

}

module.exports = {
  init: () => {
    const healthInterval = setInterval(() => {
      
      console.log('acquring lock');
      console.log(lockAcquired);

      __lock__.acquire((err, lockAcquired) => {
        if (err) {
          return console.error(err)
        }

        if (lockAcquired) {
          scheduler();
        }
      });
    }, config.intervalTime);
  }
};

