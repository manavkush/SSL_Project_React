const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const _ = require("lodash");
const { forEach } = require("lodash");
var cors = require("cors");
const path = require("path");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Enables the file uploading
app.use(fileUpload());

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

connectDB();

const bookSchema = new mongoose.Schema({
  book_name: String,
  book_author: String,
  book_ISBN: String,
  book_genre: String,
});
const Book = new mongoose.model("Book", bookSchema);
const book1 = new Book({
  book_name: "CLRS",
  book_author: "Cormen",
  book_ISBN: "2222",
  book_genre: "Algo",
});
const book2 = new Book({
  book_name: "Physics",
  book_author: "HCV",
  book_ISBN: "3333",
  book_genre: "IIT",
});

const libSchema = new mongoose.Schema({
  book: bookSchema,
  count: Number,
});
const Lib = new mongoose.model("Lib", libSchema);
const entry1 = new Lib({
  book: book1,
  count: 3,
});
const entry2 = new Lib({
  book: book2,
  count: 3,
});

const studentSchema = new mongoose.Schema({
  student_name: String,
  student_rollno: Number,
  student_due: Number,
  // book_issued: bookSchema
});
const Student = new mongoose.model("Student", studentSchema);
const student1 = new Student({
  student_name: "Manav",
  student_rollno: 190010023,
  student_due: 23,
});
const student2 = new Student({
  student_name: "Pratik",
  student_rollno: 190010034,
  student_due: 34,
});
const student3 = new Student({
  student_name: "Soni",
  student_rollno: 190030002,
  student_due: 100,
});

// student3.save();
const issuedBookSchema = new mongoose.Schema({
  issued_rollno: String,
  issued_ISBN: String,
});
const Issue = new mongoose.model("Issue", issuedBookSchema);
const firstIssue = new Issue({
  issued_rollno: student1.student_rollno,
  issued_ISBN: book1.book_ISBN,
});

Book.find({}, function (err, found) {
  if (!err) {
    if (found.length === 0) {
      book1.save();
      book2.save();
    }
  } else console.log(err);
});
Lib.find({}, function (err, found) {
  if (!err) {
    if (found.length === 0) {
      entry1.save();
      entry2.save();
    }
  } else console.log(err);
});
Student.find({}, function (err, found) {
  if (!err) {
    if (found.length === 0) {
      student2.save();
      student1.save();
    }
  } else console.log(err);
});
Issue.find({}, function (err, found) {
  if (!err) {
    if (found.length === 0) {
      firstIssue.save();
    }
  } else console.log(err);
});

// var bname = "physi";
// bname = (_.toLower(bname));
// console.log(bname);

//================================================== Searching a book ==================================

//================================================= Add a book to library ==============================

//================================================= Remove a book from library ==============================

//============================================== Issue a book ==========================================

//========================================== Returning a book ==========================================

//----------------------------Printing Files-------------------------

console.log("Checking");
const printerSchema = new mongoose.Schema({
  link: String,
  color: String,
  size: String,
  copies: Number,
  both: String,
  details: String,
  rollno: String,
});

const Printer = new mongoose.model("Print", printerSchema);

//========================================= UPLOADING File ===========================

app.post("/upload", (req, res) => {
  console.log("Testing");
  console.log(req.body);
  let returnObj = {
    Status: false,
    StatusMessage: "",
  };
  if (req.body.link == "") {
    returnObj.StatusMessage = "Ops! No File Found";
  } else if (req.body.copies === 0) {
    returnObj.StatusMessage = "0 copies cannot be printed ;)";
  } else {
    returnObj.Status = true;
    let email = req.body.email;
    let rollno = email.substr(0, 9);

    let returnObjAdmin = {
      link: req.body.link,
      color: req.body.color,
      size: req.body.size,
      copies: req.body.copies,
      both: req.body.both,
      details: req.body.details,
      rollno: rollno,
    };
    const newPrint = new Printer({
      link: req.body.link,
      color: req.body.color,
      size: req.body.size,
      copies: req.body.copies,
      both: req.body.both,
      details: req.body.details,
      rollno: rollno,
    });
    newPrint.save();
  }
  res.send(returnObj);
});
//========================================== PRINT ADMIN ================================

app.post("/printAdmin", (req, res) => {
  Printer.find({}, (err, found) => {
    let returnObj = {
      Status: false,
      StatusMessage: "",
      printArr: [],
    };
    console.log(found.length);

    if (err) {
      returnObj.StatusMessage = err;
    } else {
      if (found.length == 0) {
        returnObj.StatusMessage = "No Pending Prints";
      } else {
        returnObj.Status = true;
        returnObj.printArr = found;
        console.log();
      }
    }
    res.send(returnObj);
  });
});
//For printing and deleting the printed query

app.post("/deleteAdmin", (req, res) => {
  const ID = req.body.deleteId;
  const rollno = req.body.rollno;
  const cost = req.body.cost;

  Printer.findOneAndDelete({ _id: ID }, (err, deleted) => {
    let returnObj = {
      Status: false,
      StatusMessage: "",
    };
    console.log(deleted);
    if (err) {
      returnObj.StatusMessage = "Not Able to delete";
    } else if (!deleted) {
      returnObj.Status = false;
      returnObj.StatusMessage = "Could Not Find !!";
    } else {
      returnObj.Status = true;
      returnObj.StatusMessage = "Deleted!!";

      Student.findOneAndUpdate(
        { student_rollno: rollno },
        { $inc: { student_due: cost } },
        { new: true },
        (err, updated) => {
          console.log(updated);
        }
      );
    }

    res.send(returnObj);
  });
});

app.post("/getProfile", (req, res) => {
  const email = req.body.email;
  console.log(email);
  const rollno = email.substr(0, 9);
  console.log(rollno);

  Student.findOne({ student_rollno: rollno }, (err, found) => {
    let returnObj = {
      Status: false,
      StatusMessage: "",
    };

    if (err) {
      returnObj.StatusMessage = err;
    }
    if (!found) {
      returnObj.StatusMessage = "Error 404,Student Not Found!!";
    } else {
      returnObj.Status = true;
      returnObj.student_name = found.student_name;
      returnObj.student_rollno = found.student_rollno;
      returnObj.student_due = found.student_due;
      let dig = rollno[4];
      if (dig == "1") {
        returnObj.student_branch = "CSE";
      } else if (dig == "2") {
        returnObj.student_branch = "EE";
      } else if (dig == "3") {
        returnObj.student_branch = "ME";
      }
    }
    console.log(returnObj);
    res.send(returnObj);
  });
});

//===================================================== Admin Searching Student Profile =========================
app.post("/adminStudentProfile", (req, res) => {
  // const email = req.body.email;
  const rollno = req.body.rollno;
  const costToDeduct = req.body.costToDeduct;
  // console.log(rollno);

  Student.findOneAndUpdate(
    { student_rollno: rollno },
    { $inc: { student_due: -1 * costToDeduct } },
    { new: true },
    (err, found) => {
      let returnObj = {
        Status: false,
        StatusMessage: "",
      };

      if (err) {
        returnObj.StatusMessage = err;
      }
      if (!found) {
        returnObj.StatusMessage = "Error 404,Student Not Found!!";
      } else {
        returnObj.Status = true;
        returnObj.student_name = found.student_name;
        returnObj.student_rollno = found.student_rollno;
        returnObj.student_due = found.student_due;
        let dig = rollno[4];
        if (dig == "1") {
          returnObj.student_branch = "CSE";
        } else if (dig == "2") {
          returnObj.student_branch = "EE";
        } else if (dig == "3") {
          returnObj.student_branch = "ME";
        }
      }
      res.send(returnObj);
    }
  );
});

app.use(express.json({ extended: false }));

app.use("/return", require("./routes/api/return"));
app.use("/issue", require("./routes/api/issue"));
app.use("/removeBook", require("./routes/api/removeBook"));
app.use("/search", require("./routes/api/search"));
app.use("/addBook", require("./routes/api/addBook"));

let PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
