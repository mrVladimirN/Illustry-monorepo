import { Router } from 'express';
import * as dashboardAPI from '../../api/project/project';

const router = Router();

router.post('/api/project', dashboardAPI.create);
router.post('/api/projects', dashboardAPI.browse);
router.post('/api/project/:name', dashboardAPI.findOne);
router.put('/api/project', dashboardAPI.update);
router.delete('/api/project', dashboardAPI._delete);

export default router;
