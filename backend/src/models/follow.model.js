import mongoose from "mongoose";

const followSchema = mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: function () {
          return this.follower.toString() !== this.following.toString();
        },
        message: "User cannot follow themselves",
      },
    },
  },
  { timestamps: true }
);

// Prevent duplicate follows
followSchema.index({ follower: 1, following: 1 }, { unique: true });

export const Follow = mongoose.model("Follow", followSchema);
