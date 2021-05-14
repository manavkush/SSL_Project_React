const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Book } = require("../../models/Book");
const Lib = require("../../models/Lib");

router.post("/", async (req, res) => {
  const bISBN = _.toUpper(req.body.book_ISBN);
  const incrementValue = req.body.count;

  // Return API
  var returnObject = {
    Status: false,
    StatusMessage: "Server Error",
  };

  try {
    const found = await Lib.findOne({ "book.book_ISBN": bISBN });
    if (!found) {
      returnObject.StatusMessage = "Book Not Found";
      res.send(returnObject);
    }
    if (found.count <= incrementValue) {
      try {
        await Lib.findOneAndDelete({ "book.book_ISBN": bISBN });
        await Book.findOneAndDelete({ book_ISBN: bISBN });

        returnObject.Status = true;
        returnObject.StatusMessage = "Deleted the Book";
      } catch (err) {
        console.log(err);
        returnObject.StatusMessage = err;
        res.send(returnObject);
      }
    } else {
      await Lib.findOneAndUpdate(
        { "book.book_ISBN": bISBN },
        { $inc: { count: -1 * incrementValue } },
        { new: true }
      );
    }
  } catch (err) {
    console.log(err);
    returnObject.StatusMessage = err;
  }
  res.send(returnObject);
});

module.exports = router;
