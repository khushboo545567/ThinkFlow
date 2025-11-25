import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import { addRoleToUser } from "../controllers/assignRoleToUser.controller.js";

const router = Router();

router
  .route("/to-user")
  .post(verifyJwt, authorizeRoles("admin"), addRoleToUser);

export default router;
