import { Post } from "../models/post.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudnary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import sharp from "sharp";
import fs from "fs";

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
      const compressedPath = `uploads/compressed-${file.filename}`;

      // reduce the file to 70% compression
      await sharp(file.path)
        .resize({ width: 1000 })
        .jpeg({ quality: 70 })
        .toFile(compressedPath);

      const uploadedImage = await uploadOnCloudnary(compressedPath);

      // clean up local files
      fs.unlinkSync(file.path);
      fs.unlinkSync(compressedPath);

      return uploadedImage;
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
const editArticle = asyncHandler(async (req, res) => {});

// get post on the following of the user (first find the users follower and then find these authros in teh post createdby and return )
const getPostForFeed = asyncHandler(async (req, res) => {});

// admin can fetch the post by giving the user id to see the users post take the uid from the body and || the user can also view their own posts take the uid form the req.param
const getPostForUser = asyncHandler(async (req, res) => {});

// admin in body uid get, and user can delete the post from param uid get
const deletePost = asyncHandler(async (req, res) => {});

export { PostAticle };
