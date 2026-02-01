import mongoose from 'mongoose';

const ContactInquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['New', 'In Progress', 'Resolved'],
        default: 'New',
    },
    adminReply: String,
}, { timestamps: true });

export default mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', ContactInquirySchema);
