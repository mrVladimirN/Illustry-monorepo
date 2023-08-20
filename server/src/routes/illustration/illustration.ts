import { Router } from "express";
import * as illustrationAPI from "../../api/visualization/visualization";

const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({ destination: null });
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});
const finalupload = upload.fields([{ name: "File", maxCount: 10 }]);
router.post("/api/visualization", finalupload, illustrationAPI.createOrUpdate);
router.post("/api/visualizations", illustrationAPI.browse);
router.post("/api/visualization/:name", illustrationAPI.findOne);
// router.put("/api/visualization", illustrationAPI.update);
router.delete("/api/visualization", illustrationAPI._delete);
export default router;
