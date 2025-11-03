import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

const uploadOnCloudnary = async (localPath) => {
  try {
    if (!localPath) return null;
    const upload = await cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localPath);
    return response;
  } catch (error) {
    fs.unlinkSync(localPath);
    return null;
  }
};

export { uploadOnCloudnary };
