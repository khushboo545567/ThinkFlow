import mongoose from "mongoose";

const catogeryShcema = mongoose.Schema(
  {
    catogeryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Catogery = mongoose.model("Catogery", catogeryShcema);
