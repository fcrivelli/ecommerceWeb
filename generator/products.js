const faker = require('faker');

faker.locale = 'es';

const get = () => ({
    name : faker.name.findName(),
    price : faker.random.alphaNumeric(),
    stock : faker.random.alphaNumeric(),
    category : faker.name.findName(),
    thumbnail : faker.image.avatar() 
})

module.exports = {
    get
}