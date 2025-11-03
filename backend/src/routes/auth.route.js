import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { registerUser } from "../controllers/auth.controller";

const router = Router();
router.route("/register").post(upload.single("avatar"), registerUser);

export default router;
