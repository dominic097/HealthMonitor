const express = require('express');
const HealthController = require('./health.controller');

const router = express.Router();
const SERVER_ERROR = 500;
const STATUS_OK = 200;

router.get('/health', (req, res) => {
  res.send({
    status: 'ok',
    uid: 'pets-service',
  });
});

router.get('/', (req, res) => {
  HealthController.getHealthInfo()
    .then((data) => {
      res.status(STATUS_OK).send({
        status: 'ok',
        data,
      });
    })
    .catch((error) => {
      res.status(STATUS_OK).send({
        status: 'ok',
        error,
      });
    });
});

module.exports = router;
