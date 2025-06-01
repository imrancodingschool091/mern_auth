import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
});

export const uploadOnCloudinary = async (imagePath) => {
    if (!imagePath) {
        console.log("Image path is required");
        return null;
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            resource_type: "auto"
        });

        return result;
    } catch (error) {
        console.log("Uploading failed on Cloudinary", error);
        return null;
    }
};
