const { model, Schema } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['Romance', 'Sci-Fi', 'Crime', 'Adventure', 'Fiction', 'Thriller', 'Other'],
        default: 'Other'
    },
    author: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: false
    }
});

const Book = model('Books', BookSchema);
module.exports = Book;

