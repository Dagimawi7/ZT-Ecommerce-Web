import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function to add a new product to the database
const addProduct = async (req, res) => {
  try {
    // Get product details from the request body
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    // Get uploaded images from the request files (if they exist)
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Put all images into an array and remove any that are undefined
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // Upload all images to Cloudinary and get their secure URLs
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url; // Return the secure URL of each uploaded image
      })
    );

    // Prepare the product data object to save in the database
    const productData = {
      name,
      description,
      category,
      price: Number(price), // Convert price to number
      subcategory,
      bestseller: bestseller === "true" ? true : false, // Convert string to boolean
      sizes: JSON.parse(sizes), // Convert sizes from string to array
      image: imagesUrl, // Add uploaded image URLs
      date: Date.now(), // Save the current date
    };

    console.log(productData); // Print product data for debugging

    // Create a new product instance and save it to the database
    const product = new productModel(productData);
    await product.save();

    // Send success response
    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Function to get (list) all products from the database
const listProducts = async (req, res) => {

};

// Function to delete a product from the database
const removeProduct = async (req, res) => {

};

// Function to get details of a single product
const singleProduct = async (req, res) => {
  
};

// Exporting all functions so they can be used in other files
export { listProducts, addProduct, removeProduct, singleProduct };
