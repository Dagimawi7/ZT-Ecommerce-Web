// Import mongoose to create schema and model
import mongoose from "mongoose";

// Create a schema for products
// Defines what data each product should have
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },          // Name of the product (text, required)
    description: { type: String, required: true },   // Product description (text, required)
    price: { type: Number, required: true },         // Price of the product (number, required)
    image: { type: Array, required: true },          // Array of image URLs (required)
    Category: { type: String, required: true },      // Main category of product (text, required)
    subCategory: { type: String, required: true },   // Sub-category of product (text, required)
    sizes: { type: Array, required: true },          // Array of available sizes (required)
    bestseller: { type: Boolean },                   // Whether product is a bestseller (true/false)
    date: { type: Number, required: true }           // Date added (timestamp, required)
});

// Create the product model
// Checks if model already exists to avoid re-defining it
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

// Export the model to use in other files (like backend routes)
export default productModel;
