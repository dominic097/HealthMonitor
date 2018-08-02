const express = require('express');
const HealthController = require('./health.controller');

const router = express.Router();

router.get('/health', (req, res) => {
  res.send({
    status: 'ok',
    uid: 'pets-service',
  });
});

router.get('/', (req, res) => {
  HealthController.getHealthInfo()
    .then((data) => {
      res.send({
        status: 'ok',
        data,
      });
    })
    .catch();
});

module.exports = router;
