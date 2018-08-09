"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const health_controller_1 = require("./health.controller");
const responseHandler_1 = require("./../../utils/responseHandler");
const healthController = new health_controller_1.default();
const monitRoute = express.Router();
monitRoute.get('/health', (req, res) => {
    new responseHandler_1.ResponseHandler(req, res, {
        status: 'success',
        uid: 'monit-health-service',
    });
});
monitRoute.get('/', (req, res) => {
    // controller is made to be State-less hence no need to create new instance for every request - this is done by this way to keep the memory foot print small :) 
    new responseHandler_1.ResponseHandler(req, res, healthController.get);
});
monitRoute.get('/:dc', (req, res) => {
    const datacenter = req.params.dc || '';
    new responseHandler_1.ResponseHandler(req, res, healthController.get, datacenter);
});
exports.default = monitRoute;
//# sourceMappingURL=health.route.js.map