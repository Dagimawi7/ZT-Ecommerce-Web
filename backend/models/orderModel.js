
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default: 'Order Placed' }, // Changed to string to allow flexibility, but we will enforce workflow in controller or validation if stricter control needed
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Number, required: true },
    promoCode: { type: String, default: null },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 }
})

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
