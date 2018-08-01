const mongoose = require('mongoose');

/* eslint-disable no-unused-vars */
// define the schema for our user model
const schema = mongoose.Schema({
  serviceName: { type: String },
  lastUpdatedTime: { type: Date },
  retryCount: { type: Number, default: 0 },
  status: { type: String },
  history: { type: Array },
  inserted: { type: Date, default: Date.now },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */


schema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model('DistributedLock', schema);
