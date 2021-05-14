const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Student = mongoose.models.Student;

router.post("/", async (req, res) => {
  var returnObject = {
    Status: false,
    StatusMessage: "",
  };
  try {
    const email = req.body.email;
    const rollno = email.substr(0, 9);
    console.log(rollno);
    const result = await Student.findOne({ student_rollno: rollno });
    if (!result) {
      returnObject.StatusMessage = "Error 404, Student Not Found";
    } else {
      returnObject.Status = true;
      returnObject.student_name = result.student_name;
      returnObject.student_rollno = result.student_rollno;
      returnObject.student_due = result.student_due;
      let dig = rollno[4];
      if (dig == "1") {
        returnObject.student_branch = "CSE";
      } else if (dig == "2") {
        returnObject.student_branch = "EE";
      } else if (dig == "3") {
        returnObject.student_branch = "ME";
      }
      //   console.log(returnObject);
      res.send(returnObject);
    }
  } catch (err) {
    console.log(err);
    returnObject.StatusMessage = err;
    res.send(returnObject);
  }
});

module.exports = router;
