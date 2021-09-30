import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number
});

const Product = mongoose.model("products", productSchema);
export default Product;