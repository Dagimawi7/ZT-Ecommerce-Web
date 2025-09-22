// This file sets up the URLs (routes) for user and admin actions using Express

import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// Create a router to handle user-related requests
const userRouter = express.Router();

// When someone sends data to '/register', run registerUser function
userRouter.post('/register', registerUser);

// When someone sends data to '/login', run loginUser function
userRouter.post('/login', loginUser);

// When someone sends data to '/admin', run adminLogin function
userRouter.post('/admin', adminLogin);

// Make this router available to use in other files
export default userRouter;
