const config = require('./../config/sysConfig')


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

