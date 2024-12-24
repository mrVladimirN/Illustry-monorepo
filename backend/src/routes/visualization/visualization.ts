import { Router } from 'express';
import multer from 'multer';
import * as VisualizationAPI from '../../api/visualization/visualization';

const router = Router();

const storage = multer.diskStorage({ });
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }
});
const finalupload = upload.fields([{ name: 'file', maxCount: 10 }]);
router.post('/api/visualization', finalupload as any, VisualizationAPI.createOrUpdate);
router.post('/api/visualizations', VisualizationAPI.browse);
router.post('/api/visualization/:name', VisualizationAPI.findOne);
router.delete('/api/visualization', VisualizationAPI._delete);
export default router;
