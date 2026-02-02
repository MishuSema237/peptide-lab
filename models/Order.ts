import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    productId: {
        type: String, // Storing ID as string to decouple if needed, or use ObjectId
        required: true,
    },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    image: String,
});

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: String, // Auth0 ID or User ObjectId
        required: false, // Optional for guest checkout
    },
    guestEmail: {
        type: String,
        required: false,
    },
    items: [OrderItemSchema],
    subtotal: {
        type: Number,
        required: true,
    },
    shippingCost: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
    },
    shippingInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending Payment', 'Payment Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending Payment',
    },
    trackingNumber: String,
    notes: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
