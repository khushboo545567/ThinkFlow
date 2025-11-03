import mongoose from "mongoose";

const rolePermissionSchema = mongoose.Schema(
  {
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    premission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },

  { timestamps: true }
);

export const Rolepermission = mongoose.model(
  "Rolepermission",
  rolePermissionSchema
);
