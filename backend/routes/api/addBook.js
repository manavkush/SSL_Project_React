const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Book } = require("../../models/Book");
const Lib = require("../../models/Lib");

router.post("/", async (req, res) => {
  var returnObject = {
    Status: true,
    StatusMessage: "Added the book to the library",
  };
  try {
    const { book_ISBN, book_author, book_name, book_genre, count } = req.body;

    const result = await Book.findOne({ book_ISBN: book_ISBN });
    if (!result) {
      const inbook = new Book({
        book_name: _.toUpper(book_name),
        book_author: _.toUpper(book_author),
        book_ISBN: _.toUpper(book_ISBN),
        book_genre: _.toUpper(book_genre),
      });
      await inbook.save();
      const libinsert = new Lib({
        book: inbook,
        count: count,
      });
      await libinsert.save();
      console.log("Inserted");
    } else {
      try {
        const updated = await Lib.findOneAndUpdate(
          { "book.book_ISBN": book_ISBN },
          { $inc: { count: count } },
          { new: true }
        );
        console.log(updated);
      } catch (err) {
        console.log(err);
        returnObject.Status = false;
        returnObject.StatusMessage = err;
      }
    }
    res.send(returnObject);
  } catch (err) {
    console.log(err);
    returnObject.Status = false;
    returnObject.StatusMessage = err;
    res.send(returnObject);
  }
});

module.exports = router;
