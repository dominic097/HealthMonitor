const config = require('./../config/sysConfig')
const Lock = require('./scheduler.lock.js');

const __lock__ = Lock('scheduler', {
  timeout: config.intervalTime,
});

const scheduler = () => {
  const schedulerID = config.nodeId;
  console.log(`Scheduler ID: ${schedulerID}`);

}

module.exports = {
  init: () => {
    const healthInterval = setInterval((err, lockAcquired) => {
      
      console.log('acquring lock');

      __lock__.acquire(() => {
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

