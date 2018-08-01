const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
  status: { type: String },
  fromTime: { type: Date, default: Date.now }
});

/* eslint-disable no-unused-vars */
// define the schema for our user model
const serviceSchema = mongoose.Schema({
  serviceName: { type: String },
  lastUpdatedTime: { type: Date },
  retryCount: { type: Number, default: 0 },
  status: { type: String },
  history: { type: statusSchema },
  inserted: { type: Date, default: Date.now },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */


serviceSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('DistributedLock', schema);
