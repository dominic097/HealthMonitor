import * as express from 'express';
import HealthController from './health.controller';

const healthController = new HealthController();
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
  HealthController.getHealthInfo()
    .then((data) => {
      res.status(STATUS_OK).send({
        status: 'ok',
        data,
      });
    });
});

monitRoute.get('/:dc', (req, res) => {
  const datacenter = req.params.dc || '';
  HealthController.getHealthInfoByDC(datacenter)
    .then((data) => {
      res.status(STATUS_OK).send({
        status: 'ok',
        data,
      });
    });
});

export default monitRoute;
