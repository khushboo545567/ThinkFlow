import asyncHandler from "../utils/asyncHandler.js";
import { Follow } from "../models/follow.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const follow = asyncHandler(async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.authorId;

  // check if author id is there
  if (!followingId) {
    throw new ApiError(400, "author id is requied");
  }

  if (followerId.toSting() === followingId.toSting()) {
    throw new ApiError(400, "User cannot follow themselves");
  }

  const follow = await Follow.create({
    follower: followerId,
    following: followingId,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, follow, "user followed authro successfully"));
});

export { follow };
