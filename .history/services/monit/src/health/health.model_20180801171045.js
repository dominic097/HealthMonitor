
const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status: { type: String },
  fromTime: { type: Date, default: Date.now() },
  tillTime: { type: Date, default: Date.now() },
  isLatest: { type: Boolean, default: true },
});

/* eslint-disable no-unused-vars */
// define the schema for our user model
const serviceSchema = new mongoose.Schema({
  serviceName: { type: String },
  lastUpdatedTime: { type: Date },
  status: { type: String },
  history: { type: [statusSchema] },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */

serviceSchema.static('findByServiceName', function (service, cb) {
  return this.find({ serviceName: service }, cb);
});

serviceSchema.static('updateHealth', function (doc) {
  this.findOneAndUpdate({ 'serviceName': doc.serviceName }, { ...doc }, { upsert: true, new: true, setDefaultsOnInsert: true }, (err, model) => {
    if (err) throw new Error(err);
    model.history.findOne({ isLatest: true }, (error, statusObj) => {
      if (err) throw new Error(error);
      if (statusObj.status === doc.status) {
        // update the last update time 
      } else {
        // update the last update time  and create a new record for currnet status 
      }
    });
  });
});

module.exports = modelName => mongoose.model(modelName, serviceSchema);
