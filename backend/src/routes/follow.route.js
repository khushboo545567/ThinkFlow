import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { follow } from "../controllers/follow.controller.js";

const router = Router();

router.route("/to-author/:authorId").post(verifyJwt, follow);

export default router;
