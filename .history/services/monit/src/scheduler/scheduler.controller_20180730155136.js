const config = require('./../config/sysConfig')
const Lock = require('./scheduler.lock.js');

const __lock__ = new Lock('scheduler', {
  timeout: 10000,
});

const scheduler = () => {
  const schedulerID = config.nodeId;
  console.log(`Scheduler ID: ${schedulerID}`);

}

module.exports = {
  init: () => {
    const healthInterval = setInterval(() => {
      scheduler();
    }, config.intervalTime);
  }
};
