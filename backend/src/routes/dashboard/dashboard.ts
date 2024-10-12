import { Router } from 'express';
import * as dashboardAPI from '../../api/dashboard/dashboard';

const router = Router();

router.post('/api/dashboard', dashboardAPI.create);
router.post('/api/dashboards', dashboardAPI.browse);
router.post('/api/dashboard/:name', dashboardAPI.findOne);
router.put('/api/dashboard', dashboardAPI.update);
router.delete('/api/dashboard', dashboardAPI._delete);

export default router;
