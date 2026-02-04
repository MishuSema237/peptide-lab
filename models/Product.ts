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
    content: String,      // e.g., "10mg", "5 vials"
    size: String,         // e.g., "2ml", "5mg/vial"
    form: String,         // e.g., "Lyophilized powder", "Injectable solution"
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
