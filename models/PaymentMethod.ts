import mongoose from 'mongoose';

const PaymentMethodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['bank', 'crypto', 'app', 'other'],
        required: true,
    },
    details: {
        type: String, // Account number, wallet address, etc.
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

export default mongoose.models.PaymentMethod || mongoose.model('PaymentMethod', PaymentMethodSchema);
