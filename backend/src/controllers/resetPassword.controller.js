import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import crypto from "crypto";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const { password } = req.body;

  if (!token) throw new ApiError(400, "Token missing");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log("reset password hashed token ", hashedToken);
  console.log("reset password unhashed token ", token);

  const user = await User.findOne({
    forgetPasswordToken: hashedToken,
    expiryPasswordToken: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or expired token");

  user.password = password;
  user.forgetPasswordToken = undefined;
  user.expiryPasswordToken = undefined;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

export { resetPassword };
