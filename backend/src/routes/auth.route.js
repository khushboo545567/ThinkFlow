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
router.route("/logout").post(logoutUser);

// get current user
router.route("/get-current-user").get(getCurrentUser);

// change password
router
  .route("/change-password")
  .post(changePasswrodValidator(), changePasswrod);

// forgetPassword
router.route("/forget-password").post(forgetPasswordValidator(), fogetPasswrod);

// reset password
router.route("/reset-password").post(loginUserValidator(), resetPassword);

// resend email
router.route("/resend-email").post(resendEmail);

// update user
router.route("/update-user").post(updateUserProfile);

// refresh token
router.route("/refresh-token").post(generateRefreshToken);

export default router;
