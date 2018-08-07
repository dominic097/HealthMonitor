"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/* eslint-disable no-unused-vars */
// define the schema for our user model
const schema = mongoose.Schema({
    name: { type: String },
    expire: { type: Date },
    inserted: { type: Date, default: Date.now },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */
schema.index({ name: 1 }, { unique: true });
exports.default = mongoose.model('DistributedLock', schema);
//# sourceMappingURL=scheduler.model.js.map