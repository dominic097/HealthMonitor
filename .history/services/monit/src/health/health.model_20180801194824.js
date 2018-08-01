
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
    const latestStatus = model.history.filter(h => h.isLatest);
    if (latestStatus.length) {
      latestStatus.set({
        tillTime: Date.now(),
      });
    } else {
      model.history.push({
        status: doc.status,
        isLatest: true,
      });
    }
    model.markModified('history');
    model.save();
  });
});

module.exports = modelName => mongoose.model(modelName, serviceSchema);
