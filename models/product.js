const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    "product_id": Number,
    "name": String,
    "category": String,
    "color": String,
    "size": String,
    "price": Number,
    "stock": Number,
    "gender": String,
    "short_description": String,
    "image": String

});

const Product = mongoose.model('Product', ProductsSchema);
module.exports = Product;