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
      res.status(SERVER_ERROR).send({
        status: 'failed',
        error,
      });
    });
});

router.get('/:dc', (req, res) => {
  const datacenter = req.query.dc;
  HealthController.getHealthInfoByDC(datacenter)
    .then((data) => {
      res.status(STATUS_OK).send({
        status: 'ok',
        data,
      });
    })
    .catch((error) => {
      res.status(SERVER_ERROR).send({
        status: 'failed',
        error,
      });
    });
});

module.exports = router;
