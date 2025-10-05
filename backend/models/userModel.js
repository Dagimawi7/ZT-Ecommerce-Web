// This code defines a "User" model for MongoDB using Mongoose.
// It specifies the structure of a user document and creates a model
// that can be used to interact with the "users" collection in the database.

import mongoose from "mongoose";

// Define the structure (schema) of a user
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // User's name (required)
    email: { type: String, required: true, unique: true }, // User's email (required and must be unique)
    password: { type: String, required: true }, // User's password (required)
    cartData: { type: Object, default: {} }, // Stores shopping cart info (default is empty object)
  },
  { minimize: false }
); // Keep empty objects in the database instead of removing them

// Create a model from the schema, or use an existing one if already defined
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Export the model to use it in other files
export default userModel;
