import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";
import {
  assignPermissionToRole,
  deletePermissionToRole,
} from "../controllers/rolePermission.controller.js";

const router = Router();

router
  .route("/assign-permission-to-role")
  .post(verifyJwt, authorizeRoles("admin"), assignPermissionToRole);

router
  .route("/delete-permission-to-role/:roleId/:permissionId")
  .delete(verifyJwt, authorizeRoles("admin"), deletePermissionToRole);

export default router;
