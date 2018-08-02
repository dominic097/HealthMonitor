const express = require('express');
const healthRoutes = require('./health/health.route.js');

const router = express.Router();

router.use('/monit', healthRoutes);

module.exports = router;

