import promotionModel from "../models/promotionModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// Create a new promotion (Admin only)
const createPromotion = async (req, res) => {
    try {
        const { code, type, value, minPurchase, maxDiscount, startDate, endDate, applicableProducts, memberOnly, stackable, usageLimit } = req.body;

        // Validation
        if (!code || !type || value === undefined || !startDate || !endDate) {
            return res.json({ success: false, message: "All required fields must be provided" });
        }

        if (type === "percentage" && (value < 0 || value > 100)) {
            return res.json({ success: false, message: "Percentage discount must be between 0 and 100" });
        }

        if (type === "fixed" && value < 0) {
            return res.json({ success: false, message: "Fixed discount cannot be negative" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end <= start) {
            return res.json({ success: false, message: "End date must be after start date" });
        }

        // Check for duplicate code
        const existing = await promotionModel.findOne({ code: code.toUpperCase() });
        if (existing) {
            return res.json({ success: false, message: "Promotion code already exists" });
        }

        const promoData = {
            code: code.toUpperCase(),
            type,
            value,
            minPurchase: minPurchase || 0,
            maxDiscount: maxDiscount || null,
            startDate: start,
            endDate: end,
            applicableProducts: applicableProducts || [],
            memberOnly: memberOnly || false,
            stackable: stackable || false,
            usageLimit: usageLimit || null,
            isActive: true,
            createdBy: req.user?.name || "admin",
            auditLog: [{ action: "CREATED", details: `Promotion ${code.toUpperCase()} created` }]
        };

        const promotion = new promotionModel(promoData);
        await promotion.save();

        res.json({ success: true, message: "Promotion created successfully", promotion });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// List all promotions (Admin only) — bypasses the pre-find filter
const listPromotions = async (req, res) => {
    try {
        const promotions = await promotionModel.find({}).setOptions({ skipFilter: true }).sort({ createdAt: -1 });

        // Also return all promotions including expired for audit purposes
        const allPromotions = await promotionModel.collection.find({}).toArray();

        res.json({ success: true, promotions: allPromotions });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update a promotion (Admin only)
const updatePromotion = async (req, res) => {
    try {
        const { promoId, ...updateData } = req.body;

        if (!promoId) {
            return res.json({ success: false, message: "Promotion ID is required" });
        }

        const promo = await promotionModel.collection.findOne({ _id: new (await import("mongoose")).default.Types.ObjectId(promoId) });
        if (!promo) {
            return res.json({ success: false, message: "Promotion not found" });
        }

        // Add audit log entry
        const auditEntry = {
            action: "UPDATED",
            timestamp: new Date(),
            details: `Updated fields: ${Object.keys(updateData).join(", ")}`
        };

        await promotionModel.collection.updateOne(
            { _id: promo._id },
            { $set: updateData, $push: { auditLog: auditEntry } }
        );

        res.json({ success: true, message: "Promotion updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Delete a promotion (Admin only)
const deletePromotion = async (req, res) => {
    try {
        const { promoId } = req.body;

        if (!promoId) {
            return res.json({ success: false, message: "Promotion ID is required" });
        }

        await promotionModel.collection.deleteOne({ _id: new (await import("mongoose")).default.Types.ObjectId(promoId) });

        res.json({ success: true, message: "Promotion deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Validate promo code against user's cart (Authenticated users)
const validatePromoCode = async (req, res) => {
    try {
        const { code, cartItems, cartTotal, userId } = req.body;

        if (!code) {
            return res.json({ success: false, message: "Please enter a promo code" });
        }

        // Find the promotion (bypassing pre-find filter)
        const promo = await promotionModel.collection.findOne({ code: code.toUpperCase() });

        if (!promo) {
            return res.json({ success: false, message: "Invalid promo code" });
        }

        // Check if active
        if (!promo.isActive) {
            return res.json({ success: false, message: "This promo code is no longer active" });
        }

        // Check dates — expiration safeguard
        const now = new Date();
        if (now < new Date(promo.startDate)) {
            return res.json({ success: false, message: "This promo code is not yet active" });
        }
        if (now > new Date(promo.endDate)) {
            // Auto-deactivate expired promo
            await promotionModel.collection.updateOne(
                { _id: promo._id },
                { $set: { isActive: false }, $push: { auditLog: { action: "AUTO_EXPIRED", timestamp: now, details: "Automatically deactivated due to expiration" } } }
            );
            return res.json({ success: false, message: "This promo code has expired" });
        }

        // Check usage limit
        if (promo.usageLimit !== null && promo.usageCount >= promo.usageLimit) {
            return res.json({ success: false, message: "This promo code has reached its usage limit" });
        }

        // Check minimum purchase
        if (cartTotal < promo.minPurchase) {
            return res.json({ success: false, message: `Minimum purchase of $${promo.minPurchase} required for this promo` });
        }

        // Check member-only
        if (promo.memberOnly) {
            const user = await userModel.findById(userId);
            if (!user || !user.membershipActive) {
                return res.json({ success: false, message: "This promo code is for members only" });
            }
        }

        // Check product-specific promotions
        if (promo.applicableProducts && promo.applicableProducts.length > 0) {
            const cartProductIds = Object.keys(cartItems || {});
            const applicableIds = promo.applicableProducts.map(id => id.toString());
            const hasApplicable = cartProductIds.some(id => applicableIds.includes(id));
            if (!hasApplicable) {
                return res.json({ success: false, message: "This promo code doesn't apply to items in your cart" });
            }
        }

        // Calculate discount
        let discount = 0;
        if (promo.type === "percentage") {
            discount = (cartTotal * promo.value) / 100;
            if (promo.maxDiscount && discount > promo.maxDiscount) {
                discount = promo.maxDiscount;
            }
        } else if (promo.type === "fixed") {
            discount = promo.value;
            if (discount > cartTotal) {
                discount = cartTotal;
            }
        }

        res.json({
            success: true,
            message: "Promo code applied successfully!",
            discount: Math.round(discount * 100) / 100,
            promoCode: promo.code,
            type: promo.type,
            value: promo.value,
            stackable: promo.stackable
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { createPromotion, listPromotions, updatePromotion, deletePromotion, validatePromoCode };
