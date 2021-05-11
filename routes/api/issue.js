const express = require("express");
const router = express.Router();
const _ = require("lodash");

const Lib = require("../../models/Lib");
const Issue = require("../../models/Issue");

// @route   POST api/issue
// @desc    Issue a book
router.post("/", async (req, res) => {
  console.log("Issuing");
  var returnObject = {
    Status: false,
    StatusMessage: "",
  };

  try {
    const SRollNo = _.toUpper(req.body.student_rollno);
    const IssuedBook = _.toUpper(req.body.book_ISBN);
    const check = await Lib.findOne({"book.book_ISBN": IssuedBook});
    if(check.count==0) {
      returnObject.StatusMessage = "Book Not Available Currently";
      res.send();
    }

    const found = await Lib.findOneAndUpdate(
      { "book.book_ISBN": IssuedBook },
      { $inc: { count: -1 } },
      { new: true }
    );
    if (!found) {
      returnObject.StatusMessage = "Couldn't find the Book";
      res.send(returnObject);
    }
    returnObject.Status = true;
    returnObject.StatusMessage = "Issued the Book";
    
    const NewIssue = new Issue({
      issued_rollno: SRollNo,
      issued_ISBN: IssuedBook,
    });
    await NewIssue.save();
  } catch (error) {
    console.log(err);
    returnObject.StatusMessage = err;
  }
  res.send(returnObject);
});

module.exports = router;
