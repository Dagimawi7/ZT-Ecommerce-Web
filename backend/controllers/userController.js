// This file defines routes (functions) for user and admin authentication.
// Each function will handle requests like login or registration.
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

    // Route for user login
    // This function will handle user login
    // 'req' contains the incoming request (like email & password)
    // 'res' is used to send a response back to the client
const loginUser = async (req, res) => {
    
}

    // Route for user registration
    // This function will handle user registration
    // 'req' has user info like name, email, password
    // 'res' sends back success/failure response
    const registerUser = async (req, res) => {
        try {
    
            const { name, email, password } = req.body;
    
            // checking user already exists or not
            const exists = await userModel.findOne({ email });
            if (exists) {
                return res.json({ success: false, message: "User already exists" })
            }
    
            // validating email format & strong password
            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Please enter a valid email" })
            }
            if (password.length < 8) {
                return res.json({ success: false, message: "Please enter a strong password" })
            }
    
            // hashing user password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
    
            const newUser = new userModel({
                name,
                email,
                password: hashedPassword
            })
    
            const user = await newUser.save()
    
            const token = createToken(user._id)
    
            res.json({ success: true, token })
    
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message })
        }
    }
    

    // Route for admin login
    // This function will handle admin login
    // 'req' contains admin credentials
    // 'res' sends back the login result
const adminLogin = async (req, res) => {
    
}

// Export the functions so they can be used in other files (like your router)
export { loginUser, registerUser, adminLogin };
