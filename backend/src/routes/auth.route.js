import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changePasswrod,
  fogetPasswrod,
  updateUserProfile,
  resendEmail,
  generateRefreshToken,
} from "../controllers/auth.controller.js";
import { verifyEmail } from "../controllers/verifyEmail.controller.js";
import {
  changePasswrodValidator,
  forgetPasswordValidator,
  loginUserValidator,
  registerUserValidator,
} from "../validators/auth.validator.js";
import { validate } from "../middleware/validator.middleware.js";
import { resetPassword } from "../controllers/resetPassword.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router();

// Register
router
  .route("/register")
  .post(
    upload.single("avatar"),
    registerUserValidator(),
    validate,
    registerUser
  );

// login
router.route("/login").post(loginUserValidator(), validate, loginUser);

// verifyemail
router.get("/verify-email", verifyEmail);

// logout
router.route("/logout").post(verifyJwt, logoutUser);

// get current user
router.route("/get-current-user").get(verifyJwt, getCurrentUser);

// change password
router
  .route("/change-password")
  .post(changePasswrodValidator(), validate, verifyJwt, changePasswrod);

// forgetPassword
router
  .route("/forget-password")
  .post(forgetPasswordValidator(), validate, fogetPasswrod);

// reset password
router
  .route("/reset-password")
  .post(loginUserValidator(), validate, resetPassword);

// resend email
router.route("/resend-email").post(resendEmail);

// update user
router.route("/update-user").post(verifyJwt, updateUserProfile);

// refresh token
router.route("/refresh-token").post(generateRefreshToken);

export default router;
