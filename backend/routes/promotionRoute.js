import express from "express";
import { createPromotion, listPromotions, updatePromotion, deletePromotion, validatePromoCode } from "../controllers/promotionController.js";
import adminAuth from "../middleware/adminAuth.js";
import authMiddleware from "../middleware/auth.js";

const promotionRouter = express.Router();

// Admin routes
promotionRouter.post("/create", adminAuth, createPromotion);
promotionRouter.get("/list", adminAuth, listPromotions);
promotionRouter.post("/update", adminAuth, updatePromotion);
promotionRouter.post("/delete", adminAuth, deletePromotion);

// Public / User routes
promotionRouter.post("/validate", authMiddleware, validatePromoCode);

export default promotionRouter;
