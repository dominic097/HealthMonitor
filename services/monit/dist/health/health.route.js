"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const health_controller_1 = require("./health.controller");
const healthController = new health_controller_1.default();
const monitRoute = express.Router();
const SERVER_ERROR = 500;
const STATUS_OK = 200;
monitRoute.get('/health', (req, res) => {
    res.send({
        status: 'ok',
        uid: 'pets-service',
    });
});
monitRoute.get('/', (req, res) => {
    health_controller_1.default.getHealthInfo()
        .then((data) => {
        res.status(STATUS_OK).send({
            status: 'ok',
            data,
        });
    });
});
monitRoute.get('/:dc', (req, res) => {
    const datacenter = req.params.dc || '';
    health_controller_1.default.getHealthInfoByDC(datacenter)
        .then((data) => {
        res.status(STATUS_OK).send({
            status: 'ok',
            data,
        });
    });
});
exports.default = monitRoute;
//# sourceMappingURL=health.route.js.map