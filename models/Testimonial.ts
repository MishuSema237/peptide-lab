import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a star rating'],
        min: 0,
        max: 5,
    },
    message: {
        type: String,
        required: [true, 'Please provide a review message'],
    },
    active: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
