import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

// get the userId who commented  , get teh id of post , like count , what is the comment
const commentOn = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;
  const { text } = req.body;

  //check if posts exists or not
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "post does not found ");
  }

  // create the comment
  const commented = await Comment.create({
    commentedBy: userId,
    commentOnPost: postId,
    text,
  });

  // increment the posts comment count
  await Post.findByIdAndUpdate(postId, { $inc: { commentsCount: 1 } });

  return res
    .status(200)
    .json(
      new ApiResponse(201, commented, "user commented successfully on post")
    );
});

// edit comment
const editComment = asyncHandler(async (req, res) => {});

// delete comment
const deleteComment = asyncHandler(async (req, res) => {});

//  get the comment for the specific user
const getComment = asyncHandler(async (req, res) => {});

export { commentOn, editComment, deleteComment, getComment };
