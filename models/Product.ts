import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this product'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this product'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for this product'],
    },
    images: {
        type: [String],
        required: false,
    },
    category: {
        type: String,
        required: [true, 'Please specify a category'],
    },
    stock: {
        type: Number,
        default: 0,
    },
    sku: {
        type: String,
    },
    purity: String,
    soldout_status: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
