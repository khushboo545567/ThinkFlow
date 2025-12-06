import { Post } from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import sharp from "sharp";
import fs, { link } from "fs";

// user and admin can post article
const PostAticle = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { categoryId } = req.params;
  const { title, description } = req.body;

  // post details
  const postObj = { title, description, postedBy: id, category: categoryId };

  // 🖼️ Step 2: Handle multiple images
  if (req.files && req.files.length > 0) {
    const imageUploadPromises = req.files.map(async (file) => {
      const compressedPath = `public/temp-${file.filename}`;
      console.log("file name ", file.filename);

      // compress
      await sharp(file.path)
        .resize({ width: 1000 })
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      const uploadedImage = await uploadOnCloudnary(compressedPath);

      // safe cleanup using fs.promises and checks
      try {
        if (file.path && fs.existsSync(file.path)) {
          await fs.promises.unlink(file.path);
        }
      } catch (err) {
        console.warn(
          "Could not delete original temp file:",
          file.path,
          err.message
        );
      }

      try {
        if (compressedPath && fs.existsSync(compressedPath)) {
          await fs.promises.unlink(compressedPath);
        }
      } catch (err) {
        console.warn(
          "Could not delete compressed file:",
          compressedPath,
          err.message
        );
      }

      return uploadedImage; // may be null if upload failed
    });

    const uploadedResults = await Promise.all(imageUploadPromises);

    // Only store secure URLs
    const uploadedUrls = uploadedResults.map((img) => img.secure_url);

    postObj.postImage = uploadedUrls;
  }

  // create post
  const post = await Post.create(postObj);

  return res
    .status(200)
    .json(new ApiResponse(200, post, "article posted successfully"));
});

// adimn , editor, own user can edit the post
const editArticle = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { title, description, imageIndex, oldImageUrl } = req.body;
  const newFile = req.file;
  const updateOps = {};
  if (title !== undefined) {
    updateOps.title = title;
  }
  if (description !== undefined) {
    updateOps.description = description;
  }

  if (!newFile) {
    const posted = await Post.findByIdAndUpdate(postId, updateOps, {
      new: true,
      runValidators: true,
    });

    if (!posted) {
      return res.status(404).json(new ApiError(404, "post not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, posted, "post updated successfully"));
  }
});

// get post on the following of the user (first find the users follower and then find these authros in teh post createdby and return )
const getPostForFeed = asyncHandler(async (req, res) => {});

// admin can fetch the post by giving the user id to see the users post take the uid from the body and
const getPostForAdmin = asyncHandler(async (req, res) => {});
// the user can also view their own posts take the uid form the req.param
const getPostForUser = asyncHandler(async (req, res) => {});

// get post when applying filter on the catogeries
const getPostByFilter = asyncHandler(async (req, res) => {});

// admin and author can delte the post , get the post id form the params , and uid from the token
// while deleting the post delete the like and comment of that post
const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId); // this triggers post('findOneAndDelete') hook above

  return res
    .status(200)
    .json(new ApiResponse(200, "post deleted successfully !"));
});

export { PostAticle, deletePost, editArticle };
