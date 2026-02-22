import express from "express";
import { getDashboardStats } from "../controllers/analyticsController.js";
import adminAuth from "../middleware/adminAuth.js";

const analyticsRouter = express.Router();

// Admin route
analyticsRouter.get("/dashboard", adminAuth, getDashboardStats);

export default analyticsRouter;
