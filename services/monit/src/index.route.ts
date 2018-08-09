import * as express from 'express';
import monitRoute from './modules/health/health.route';

const router = express.Router();

router.use('/', monitRoute);

export default router;
