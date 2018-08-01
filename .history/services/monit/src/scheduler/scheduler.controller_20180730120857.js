const parser = require('cron-parser');
const config = require('./../config/sysConfig')


const scheduler = () => {
  const schedulerID = config.nodeId;
  console.log(`Scheduler ID: ${schedulerID}`);

}