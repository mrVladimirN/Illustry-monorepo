import { Router } from "express";
import * as VisualizationAPI from "../../api/visualization/visualization";

const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({ destination: null });
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});
const finalupload = upload.fields([{ name: "file", maxCount: 10 }]);
router.post("/api/visualization", finalupload, VisualizationAPI.createOrUpdate);
router.post("/api/visualizations", VisualizationAPI.browse);
router.post("/api/visualization/:name", VisualizationAPI.findOne);
// router.put("/api/visualization", VisualizationAPI.update);
router.delete("/api/visualization", VisualizationAPI._delete);
export default router;
