"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const index_route_1 = require("./index.route");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/', index_route_1.default);
app.use((req, res, next) => {
    const err = Object.assign({}, new Error('API Not Found'), { status: 404 });
    next(err);
});
/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
    const message = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err,
    });
});
/* eslint-enable no-unused-vars */
exports.default = app;
//# sourceMappingURL=app.js.map