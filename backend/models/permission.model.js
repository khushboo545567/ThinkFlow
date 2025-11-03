import mongoose from "mongoose";

const permissionShcema = mongoose.Schema(
  {
    resource: { type: String, required: true }, // e.g. 'Post', 'Comment', 'User'
    action: { type: String, required: true }, // e.g. 'create', 'read', 'update', 'delete'
  },
  { timestamps: true }
);

export const Permission = mongoose.model("Permission", permissionShcema);
