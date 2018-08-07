"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const health_route_1 = require("./health/health.route");
const router = express.Router();
router.use('/monit', health_route_1.default);
exports.default = router;
//# sourceMappingURL=index.route.js.map