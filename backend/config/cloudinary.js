import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = () => {
    if (!process.env.CLOUDINARY_URL) {
        throw new Error("CLOUDINARY_URL is missing from .env");
    }

    cloudinary.config({
        secure: true
    });

    console.log("Cloudinary configured");
};

export default connectCloudinary;
