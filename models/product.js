const mongoose = require('mongoose');

const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema ({
    name: {type: String, require: true, max: 100},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    category: {type: String, require: true, max: 100},
    thumbnail: {type: String, require: true, max: 100}
})

module.exports = {products: mongoose.model(productsCollection, ProductsSchema)};