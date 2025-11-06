import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { User } from "../models/user.model";

const verifyJwt = asyncHandler(async (req, res, next) => {
  let token =
    req.cookies?.accessToken || req.headers?.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }
  // 2. Verify token
  const decodedToken = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

  const user = await User.findById(decodedToken.id).select(
    "-password -avatar -bio"
  );
  if (!user) {
    throw new ApiError(401, "Unauthorized: invalid token or user not found");
  }

  // 4. Attach user to request
  req.user = user;

  next();
});
export { verifyJwt };
