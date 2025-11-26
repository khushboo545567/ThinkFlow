import { Router } from "express";
import {
  createRole,
  deleteRole,
  getRoles,
} from "../controllers/role.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";

const router = Router();

router
  .route("/create-role")
  .post(verifyJwt, authorizeRoles("admin"), createRole);

router.route("/get-roles").get(verifyJwt, authorizeRoles("admin"), getRoles);

router
  .route("/delete-role/:roleId")
  .delete(verifyJwt, authorizeRoles("admin"), deleteRole);

export default router;
