const getIndex = (id, products) => usuarios.findIndex( product => {
    return product.id === id;
});
const getNextId = products => products.length ? (products[products.length-1].id + 1) : 1;

module.exports = {
    getIndex,
    getNextId
}