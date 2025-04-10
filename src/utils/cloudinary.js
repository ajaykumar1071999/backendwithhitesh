import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import 'dotenv/config';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFileaPath) => {
  try {
    if (!localFileaPath) return null;
    const uploadResult = await cloudinary.uploader
      .upload(localFileaPath.path, {
        folder: 'user_avtar',
        use_filename: true,
        resource_type: 'auto',
      })
      .catch((error) => {
        console.log(error);
      });

    fs.unlinkSync(localFileaPath.path);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFileaPath.path);
    console.log('error from catch', error);
    return null;
  }
};

export default uploadToCloudinary;
