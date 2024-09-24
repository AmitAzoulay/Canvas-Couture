const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    "_id": mongoose.Schema.Types.ObjectId,
    "name": String,
    "category": String,
    "color": String,
    "size": String,
    "gender": String,
    "price": Number,
    "stock": Number,
    "img": String,
});

const Product = mongoose.model('Product', ProductsSchema);
module.exports = Product;
