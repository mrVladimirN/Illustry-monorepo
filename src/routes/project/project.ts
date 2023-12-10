import { Router } from 'express';
import * as projectAPI from '../../api/project/project';

const router = Router();

/* Intern */
router.post('/api/project', projectAPI.create);
router.post('/api/projects', projectAPI.browse);
router.post('/api/project/:name', projectAPI.findOne);
router.put('/api/project', projectAPI.update);
router.delete('/api/project', projectAPI._delete);

export default router;
