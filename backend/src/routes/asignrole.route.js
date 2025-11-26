import { Router } from "express";

import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import {
  addRoleToUser,
  getAssignedRole,
  removeRoleToUser,
} from "../controllers/assignRoleToUser.controller.js";

const router = Router();

router
  .route("/to-user")
  .post(verifyJwt, authorizeRoles("admin"), addRoleToUser);

router
  .route("/get-assignedrole")
  .get(verifyJwt, authorizeRoles("admin"), getAssignedRole);

router
  .route("/remove-roleto-user/:userId/:roleId")
  .delete(verifyJwt, authorizeRoles("admin"), removeRoleToUser);

export default router;
