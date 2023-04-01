require('dotenv').config();
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

  name : String,
  author : String,
  price : String,
  avail : String

});

const Book = new mongoose.model('Book',bookSchema);
module.exports = Book;