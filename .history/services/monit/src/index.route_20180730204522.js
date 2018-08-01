const express = require('express');
const healthRoutes = require('./health/health.route.js');

const router = express.Router();

router.use('/health', healthRoutes);

module.exports = router;

