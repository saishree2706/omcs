const { Int32 } = require('bson')
const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    copies: {
        type: Number,
        required: true
    }
});

module.exports=mongoose.model('Book',bookSchema);