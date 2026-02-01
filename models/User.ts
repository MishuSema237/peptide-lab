import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer',
    },
    addresses: [{
        type: {
            type: String, // 'billing' or 'shipping'
        },
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        phone: String,
    }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
