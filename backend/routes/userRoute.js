// This file sets up the URLs (routes) for user and admin actions using Express

import express from 'express';
import { loginUser, registerUser, adminLogin, upgradeMembership } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import userModel from '../models/userModel.js';

// Create a router to handle user-related requests
const userRouter = express.Router();

// When someone sends data to '/register', run registerUser function
userRouter.post('/register', registerUser);

// When someone sends data to '/login', run loginUser function
userRouter.post('/login', loginUser);

// When someone sends data to '/admin', run adminLogin function
userRouter.post('/admin', adminLogin);

// Upgrade membership route
userRouter.post('/upgrade-membership', authMiddleware, upgradeMembership);

// Get user profile including role and membership
userRouter.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
});

// Make this router available to use in other files
export default userRouter;
