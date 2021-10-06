const mongoose = require('mongoose');

const cartsCollection = 'carts';

const CartsSchema = new mongoose.Schema ({
    name: {type: String, require: true, max: 100},
    productId: {type: String, require: true, max: 100}
})

module.exports = { carts: mongoose.model(cartsCollection, CartsSchema)};