const generator = require('../generator/products');
const util = require('../server/utils');

var  products = [];

const generate = (req, res) => {
    let cant = req.params.cant || 50;
    let products = [];
    for(let i=0; i<cant; i++){
        let product = generator.get();
        product.id = i + 1;
        products.push(product);
    }
    res.render("./layouts/products.ejs", {products: products});
}

/* GET */
const get = (req, res) => {
    let id = Number(req.params.id);
    if(id){
        let index = util.getIndex(id, products);
        let product = products[index];
        res.render("./layouts/catalogue.ejs", {products: product});
    } else {
        res.render("./layouts/catalogue.ejs", {products: products});
    }
}

/* Post */
const post = (req, res) => {
    let product = req.body;
    product.id = util.getNextId(products);
    products.push(product);
    res.render("./layouts/catalogue.ejs", {products: product});
}

/* Put con actualización parcial */
const put = (req, res) => {
    let id = Number(req.params.id);
    let productNuevo = req.body;
    productNuevo.id = id;
    let index = util.getIndex(id, products);
    let productActual = products[index];
    let productActualizado = { ...productActual, ...productNuevo};
    products.splice(index, 1, productActualizado);
    res.render("./layouts/catalogue.ejs", {products: productActualizado});
}

/* Delete */
const del = (req, res) => {
    let id = Number(req.params.id);
    let index = util.getIndex(id, products);
    let product = products.splice(index, 1);
    res.render("./layouts/catalogue.ejs", {products: product});
}

module.exports = {
    generate,
    get,
    post,
    put,
    del
}