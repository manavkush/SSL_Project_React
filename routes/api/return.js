const express = require("express");
const router = express.Router();
const _ = require("lodash");

const Issue = require("../../models/Issue");
const Lib = require("../../models/Lib");

router.post("/", async (req, res) => {
  console.log("Returning a book");
  var returnObject = {
    Status: false,
    StatusMessage: "Server Error",
  };
  const returned_ISBN = _.toUpper(req.body.book_ISBN);
  const student_rollno = _.toUpper(req.body.student_rollno);
  try {
    const deleted = await Issue.findOneAndDelete({
      issued_ISBN: returned_ISBN,
      issued_rollno: student_rollno,
    });
    if (!deleted) {
      returnObject.StatusMessage = "Couldn't find the book";
      res.send(returnObject);
    }
  } catch (err) {
    returnObject.StatusMessage = err;
    res.send(returnObject);
  }
  try {
    const returned = await Lib.findOneAndUpdate(
      { "book.book_ISBN": returned_ISBN },
      { $inc: { count: 1 } },
      { new: true }
    );
    if(!returned) {
      returnObject.StatusMessage = "Couldn't Find the Book";
      res.send(StatusMessage);
    }
  } catch(err) {
    returnObject.StatusMessage = err;
    res.send(returnObject);
  }
  returnObject.Status = true;
  returnObject.StatusMessage = "Returned the book";
  res.send(returnObject);
});

module.exports = router;
