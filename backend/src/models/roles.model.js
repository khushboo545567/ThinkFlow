import mongoose from "mongoose";

const roleShcema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Role = mongoose.model("Role", roleShcema);
