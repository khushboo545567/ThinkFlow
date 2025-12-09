import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  deletePost,
  editArticle,
  getPostByFilter,
  getPostForAdmin,
  getPostForFeed,
  getPostForUser,
  PostAticle,
} from "../controllers/post.controller.js";
import { authorizeRoles } from "../middleware/rbac.middleware.js";

const router = Router();

router
  .route("/post-article/:categoryId")
  .post(verifyJwt, upload.array("postImage", 5), PostAticle);

router
  .route("/edit-article/:postId")
  .put(verifyJwt, authorizeRoles("admin", "editor"), editArticle);

router.route("/get-post-for-feed").get(verifyJwt, getPostForFeed);

router
  .route("/get-post-for-admin")
  .get(verifyJwt, authorizeRoles("admin"), getPostForAdmin);

router.route("/get-post-by-filter/:filterName").get(verifyJwt, getPostByFilter);

router.route("/get-post-for-user").get(verifyJwt, getPostForUser);

router.route("/delete-post/:postId").put(verifyJwt, deletePost);

export default router;
