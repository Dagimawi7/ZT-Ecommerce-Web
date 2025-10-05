// Importing express and the product controller functions
import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController";

// Creating a new router for handling product-related routes
const productRouter = express.Router();

// Route to add a new product (POST request)
productRouter.post("/add", addProduct);

// Route to remove a product (POST request)
productRouter.post("/remove", removeProduct);

// Route to get details of a single product (POST request)
productRouter.post("/single", singleProduct);

// Route to list all products (GET request)
productRouter.get("/list", listProducts);

// Exporting the router so it can be used in other files 
export default productRouter;
