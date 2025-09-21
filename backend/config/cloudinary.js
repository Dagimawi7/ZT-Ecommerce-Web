import {v2 as cloudinary } from "cloudinary"

// Function to connect to Cloudinary
const connectCloudinary = async () => {

    // Set up Cloudinary credentials from .env file
    // cloud_name, api_key, api_secret are needed to access your Cloudinary account
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })
}

// Export the function so we can use it in other files
export default connectCloudinary