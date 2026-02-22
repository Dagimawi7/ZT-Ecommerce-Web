import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    type: { type: String, required: true, enum: ["percentage", "fixed"] },
    value: { type: Number, required: true },
    minPurchase: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null }, // cap for percentage discounts
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    applicableProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }], // empty = all products
    memberOnly: { type: Boolean, default: false },
    stackable: { type: Boolean, default: false },
    usageLimit: { type: Number, default: null }, // null = unlimited
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdBy: { type: String },
    auditLog: [{
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
        details: { type: String }
    }]
}, { timestamps: true });

// Auto-deactivate expired promotions on query
promotionSchema.pre("find", function () {
    this.where({ $or: [{ endDate: { $gte: new Date() } }, { isActive: false }] });
});

const promotionModel = mongoose.models.promotion || mongoose.model("promotion", promotionSchema);

export default promotionModel;
