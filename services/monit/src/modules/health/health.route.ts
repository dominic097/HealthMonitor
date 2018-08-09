import * as express from 'express';
import HealthController from './health.controller';
import { ResponseHandler } from './../../utils/responseHandler';

const healthController = new HealthController();
const monitRoute = express.Router();

monitRoute.get('/health', (req, res) => {
  new ResponseHandler(req, res, {
    status: 'success',
    uid: 'monit-health-service',
  });
});

monitRoute.get('/', (req, res) => {
  // controller is made to be State-less hence no need to create new instance for every request - this is done by this way to keep the memory foot print small :) 
  new ResponseHandler(req, res, healthController.get);
});

monitRoute.get('/:dc', (req, res) => {
  const datacenter = req.params.dc || '';
  new ResponseHandler(req, res, healthController.get, datacenter);
});


export default monitRoute;
