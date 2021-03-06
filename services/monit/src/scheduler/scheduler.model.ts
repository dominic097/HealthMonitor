import * as mongoose from 'mongoose';

/* eslint-disable no-unused-vars */
// define the schema for our user model
const schema = mongoose.Schema({
  name: { type: String },
  expire: { type: Date },
  inserted: { type: Date, default: Date.now },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */


schema.index({ name: 1 }, { unique: true });

export default mongoose.model('DistributedLock', schema);
