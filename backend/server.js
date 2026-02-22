// Import necessary libraries
// express: used to create the backend server
// cors: allows frontend to talk to backend without errors
// dotenv/config: loads environment variables from .env file
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js";
import promotionRouter from "./routes/promotionRoute.js";
import analyticsRouter from "./routes/analyticsRoute.js";
import productModel from "./models/productModel.js";

// App Config
// Create an Express app
const app = express();
// Set the port for server to listen on (from environment or default 4000)
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middleware
// Allows backend to parse JSON data sent from frontend
app.use(express.json());
// Allows frontend to access backend from another domain/port
app.use(cors());

// Simple Request Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/promo", promotionRouter);
app.use("/api/analytics", analyticsRouter);

// Error Handling Middleware
import { errorHandler } from "./middleware/errorMiddleware.js";
app.use(errorHandler);

// Config Mode route for Staging vs Production
app.get("/api/config/mode", (req, res) => {
  res.json({ success: true, mode: process.env.APP_MODE || "production" });
});

// Create a GET route at '/' that sends a message back
app.get("/", (req, res) => {
  res.send("API WORKING"); // Send simple response to show server is running
});

app.get("/api/seed", async (req, res) => {
  const seedProducts = [
    {
      name: "Pro Elite Firm Ground Cleats",
      description: "Professional grade soccer cleats designed for maximum agility and speed on firm grass.",
      price: 220,
      image: ["https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=800&auto=format&fit=crop"],
      Category: "Men",
      subCategory: "Footwear",
      sizes: ["8", "9", "10", "11", "12"],
      bestseller: true,
      date: Date.now(),
      salePrice: 180,
      onSale: true,
      featured: true,
      earlyAccess: false,
      memberPrice: 170
    },
    {
      name: "Madrid Home Authentic Jersey 24/25",
      description: "Official white home jersey, crafted with breathable moisture-wicking technology.",
      price: 130,
      image: ["https://images.unsplash.com/photo-1614631446501-abcf76949eca?q=80&w=800&auto=format&fit=crop"],
      Category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      bestseller: true,
      date: Date.now(),
      salePrice: null,
      onSale: false,
      featured: true,
      earlyAccess: false,
      memberPrice: 115
    },
    {
      name: "Catalunya Away Kit",
      description: "Vibrant yellow away kit jersey, designed for the ultimate fan experience.",
      price: 90,
      image: ["https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=800&auto=format&fit=crop"],
      Category: "Men",
      subCategory: "Topwear",
      sizes: ["M", "L", "XL"],
      bestseller: false,
      date: Date.now(),
      salePrice: 75,
      onSale: true,
      featured: false,
      earlyAccess: false,
      memberPrice: 70
    },
    {
      name: "Grip+ Match Socks",
      description: "High-performance compression socks with anti-slip grip technology on the sole.",
      price: 35,
      image: ["https://images.unsplash.com/photo-1593358327318-c2b62baabcc8?q=80&w=800&auto=format&fit=crop"],
      Category: "Unisex",
      subCategory: "Bottomwear",
      sizes: ["S", "M", "L"],
      bestseller: true,
      date: Date.now(),
      salePrice: null,
      onSale: false,
      featured: false,
      earlyAccess: false,
      memberPrice: 28
    },
    {
      name: "Elite Training Tracksuit",
      description: "Lightweight, aerodynamic tracksuit perfect for pre-game warmups and cold weather training.",
      price: 110,
      image: ["https://images.unsplash.com/photo-1556815317-09825b29fc15?q=80&w=800&auto=format&fit=crop"],
      Category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      bestseller: false,
      date: Date.now(),
      salePrice: 85,
      onSale: true,
      featured: true,
      earlyAccess: false,
      memberPrice: 80
    },
    {
      name: "Phantom Pro Goalkeeper Gloves",
      description: "Professional match gloves featuring 4mm latex for superior grip and finger protection spines.",
      price: 150,
      image: ["https://images.unsplash.com/photo-1550810359-994af509bbbd?q=80&w=800&auto=format&fit=crop"],
      Category: "Gear",
      subCategory: "Accessories",
      sizes: ["8", "9", "10", "11"],
      bestseller: true,
      date: Date.now(),
      salePrice: null,
      onSale: false,
      featured: true,
      earlyAccess: true,
      memberPrice: 130
    },
    {
      name: "UCL Official Match Ball",
      description: "Seamless match ball used in the greatest European nights. Unpredictable flight, precision control.",
      price: 160,
      image: ["https://images.unsplash.com/photo-1614838644349-f4adcf3c3a96?q=80&w=800&auto=format&fit=crop"],
      Category: "Gear",
      subCategory: "Accessories",
      sizes: ["5"],
      bestseller: true,
      date: Date.now(),
      salePrice: 120,
      onSale: true,
      featured: true,
      earlyAccess: false,
      memberPrice: 110
    },
    {
      name: "Agility Training Cones (Set of 20)",
      description: "High-visibility, durable training cones for building speed, agility, and quick direction changes.",
      price: 25,
      image: ["https://images.unsplash.com/photo-1574629810360-7efbb1925713?q=80&w=800&auto=format&fit=crop"],
      Category: "Gear",
      subCategory: "Accessories",
      sizes: ["One Size"],
      bestseller: false,
      date: Date.now(),
      salePrice: null,
      onSale: false,
      featured: false,
      earlyAccess: false,
      memberPrice: 20
    },
    {
      name: "Carbon Fiber Shin Guards",
      description: "Ultra-lightweight carbon fiber shin guards offering maximum impact protection without the bulk.",
      price: 60,
      image: ["https://images.unsplash.com/photo-1624880357913-a8539238165b?q=80&w=800&auto=format&fit=crop"],
      Category: "Gear",
      subCategory: "Accessories",
      sizes: ["S", "M", "L"],
      bestseller: false,
      date: Date.now(),
      salePrice: 45,
      onSale: true,
      featured: false,
      earlyAccess: false,
      memberPrice: 40
    },
    {
      name: "Astro Turf Legend Shoes",
      description: "Classic turf shoes engineered with a specialized rubber outsole for synthetic surfaces.",
      price: 85,
      image: ["https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=800&auto=format&fit=crop"],
      Category: "Men",
      subCategory: "Footwear",
      sizes: ["7", "8", "9", "10", "11"],
      bestseller: true,
      date: Date.now(),
      salePrice: null,
      onSale: false,
      featured: false,
      earlyAccess: false,
      memberPrice: 75
    }
  ];

  try {
    await productModel.deleteMany({});
    await productModel.insertMany(seedProducts);
    res.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start the server
// Listen for incoming requests on the specified port
app.listen(port, () => console.log("Server started on PORT : " + port));
