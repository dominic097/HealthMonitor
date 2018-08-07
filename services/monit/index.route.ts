import * as express from 'express';
import monitRoute from './health/health.route';

const router = express.Router();

router.use('/monit', monitRoute);

export default router;

