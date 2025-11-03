import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    postImage: [
      {
        type: String, // store URLs or file paths
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);
