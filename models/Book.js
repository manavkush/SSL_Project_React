const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book_name: String,
  book_author: String,
  book_ISBN: String,
  book_genre: String,
});
const Book = mongoose.model("book", bookSchema);
module.exports = { Book, bookSchema };
