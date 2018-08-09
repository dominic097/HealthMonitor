"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    dataCenter: { type: String },
    serviceName: { type: String },
    lastUpdatedTime: { type: Date },
    status: { type: String },
    history: { type: [statusSchema] },
}, { autoIndex: true });
/* eslint-enable no-unused-vars */
serviceSchema.static('findByDataCenter', function (dc, cb) {
    return this.find({ dataCenter: dc }, cb);
});
serviceSchema.static('updateHealth', function (doc) {
    return this.findOneAndUpdate({ 'serviceName': doc.serviceName }, Object.assign({}, doc), { upsert: true, new: true, setDefaultsOnInsert: true }, (err, model) => {
        const latestStatus = model.history.filter(h => h.isLatest);
        if (latestStatus.length) {
            let statusRecord = latestStatus[0];
            statusRecord.set({
                tillTime: Date.now(),
            });
            if (statusRecord.status !== doc.status) {
                statusRecord.isLatest = false;
                model.history.push({
                    status: doc.status,
                    isLatest: true,
                });
            }
            statusRecord.save();
        }
        else {
            model.history.push({
                status: doc.status,
                isLatest: true,
            });
        }
        model.markModified('history');
        model.save();
    });
});
exports.default = modelName => mongoose.model(modelName, serviceSchema);
//# sourceMappingURL=health.model.js.map