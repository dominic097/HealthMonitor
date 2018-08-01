import { setInterval } from 'timers';

const config = require('./../config/sysConfig')


const scheduler = () => {
  const schedulerID = config.nodeId;
  console.log(`Scheduler ID: ${schedulerID}`);



}

module.exports = () => {
  const healthInterval = setInterval(()=>{
    scheduler();Î
  }, config.intervalTime);
}