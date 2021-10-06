const mongoose = require('mongoose');

const menssagesCollection = 'menssages';

const MenssagesSchema = new mongoose.Schema ({
    username: {type: String, require: true, max: 100},
    text: {type: String, require: true, max: 500},
    date: {type: String, require: true, max: 100}
})

module.exports = {messages: mongoose.model(menssagesCollection, MenssagesSchema)};