// This file defines routes (functions) for user and admin authentication.
// Each function will handle requests like login or registration.
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
// This function logs in a user by checking their email and password
const loginUser = async (req, res) => {
  try {
    // Get email and password from the request body
    const { email, password } = req.body;

    // Find a user in the database with the given email
    const user = await userModel.findOne({ email });

    // If no user is found, send a message that the user doesn't exist
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords match, create a token and send it back
    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      // If passwords don't match, send an "invalid credentials" message
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    // If there’s an error, log it and send an error response
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
// This function will handle user registration
// 'req' has user info like name, email, password
// 'res' sends back success/failure response
// This function registers (signs up) a new user
const registerUser = async (req, res) => {
  try {
    // Get name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with this email already exists in the database
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Check if the email format is valid
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check if the password is strong enough (at least 8 characters)
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Hash the password to securely store it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user object with the given data
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const user = await newUser.save();

    // Create a token for the user after registration
    const token = createToken(user._id);

    // Send success response with the token
    res.json({ success: true, token });
  } catch (error) {
    // If any error happens, log it and send an error message
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
// This function will handle admin login
// 'req' contains admin credentials
// 'res' sends back the login result
const adminLogin = async (req, res) => {
    
};

// Export the functions so they can be used in other files (like your router)
export { loginUser, registerUser, adminLogin };
