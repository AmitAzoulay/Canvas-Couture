const mongoose = require('mongoose');

const ProductsSchecma = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "product_id": Number,
    "name": String,
    "category": String,
    "color": String,
    "size": String,
    "price": Number,
    "stock": Number,
    "short_description": String

});

const Product = mongoose.model('Product', ProductsSchecma);
module.exports = Product;