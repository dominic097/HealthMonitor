const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  status: { type: String },
  fromTime: { type: Date, default: Date.now },
  tillTime: { type: Date, default: Date.now },
});

/* eslint-disable no-unused-vars */
// define the schema for our user model
const serviceSchema = mongoose.Schema({
  serviceName: { type: String },
  lastUpdatedTime: { type: Date },
  retryCount: { type: Number, default: 0 },
  status: { type: String },
  history: { type: [statusSchema] },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */

serviceSchema.static('findByServiceName', (service, cb) => {
  return this.find({ serviceName: service }, cb);
});

serviceSchema.update = (doc) => {
  this.findByServiceName(doc.serviceName, (err, model) => {

  });
};


module.exports = modelName => mongoose.model(modelName, serviceSchema);

