import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    resource: { type: String, required: true }, // e.g., 'Post'
    action: { type: String, required: true }, // e.g., 'create', 'read'
  },
  { timestamps: true }
);

permissionSchema.index({ resource: 1, action: 1 }, { unique: true });

export const Permission = mongoose.model("Permission", permissionSchema);
