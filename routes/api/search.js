const express = require("express");
const router = express.Router();
const Lib = require("../../models/Lib");
const _ = require("lodash");

// @route   POST api/search
// @desc    Search for a book

router.post("/", async (req, res) => {
  const bname = _.toUpper(req.body.book_name);
  console.log(req.body.book_name);
  let returnObject = {
    Status: true,
    Books: [],
    StatusMessage: "Found the books",
  };

  try {
    const found = await Lib.find({ "book.book_name": { $regex: bname } });

    if (found.length === 0) {
      returnObject.Status = false;
      returnObject.StatusMessage = "No books found";
      res.send(returnObject);
    }

    found.forEach((item) => {
      var obj = {
        book_name: _.startCase(item.book.book_name),
        book_ISBN: item.book.book_ISBN,
        book_author: item.book.book_author,
        book_genre: item.book.book_genre,
        book_count: item.count,
      };
      // console.log(obj);
      returnObject.Books.push(obj);
    });
    res.send(returnObject);
  } catch (err) {
    // console.log(err);

    returnObject.Status = false;
    returnObject.StatusMessage = err;
    res.send(returnObject);
  }
});

module.exports = router;
