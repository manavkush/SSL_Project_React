const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const _ = require('lodash');
const { forEach } = require("lodash");
var cors = require('cors')
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Enables the file uploading
app.use(fileUpload());

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));


mongoose.connect("mongodb://localhost:27017/lib_manage", { useNewUrlParser: true });
var conn = mongoose.connection;
conn.on("error", console.error.bind(console, "connection error:"));

let gfs;
conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});


console.log("Server Spinnning !!!!");

const bookSchema = new mongoose.Schema({
    book_name: String,
    book_author: String,
    book_ISBN: String,
    book_genre: String
});
const Book = new mongoose.model("Book", bookSchema);
const book1 = new Book({
    book_name: "CLRS",
    book_author: "Cormen",
    book_ISBN: "2222",
    book_genre: "Algo"
})
const book2 = new Book({
    book_name: "Physics",
    book_author: "HCV",
    book_ISBN: "3333",
    book_genre: "IIT"
})

const libSchema = new mongoose.Schema({
    book: bookSchema,
    count: Number
});
const Lib = new mongoose.model("Lib", libSchema);
const entry1 = new Lib({
    book: book1,
    count: 3
});
const entry2 = new Lib({
    book: book2,
    count: 3
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
    student_due: 23
});
const student2 = new Student({
    student_name: "Pratik",
    student_rollno: 190010034,
    student_due: 34
});
const student3 = new Student({
    student_name: "Soni",
    student_rollno: 190030002,
    student_due: 100
});

// student3.save();
const issuedBookSchema = new mongoose.Schema({
    issued_rollno: String,
    issued_ISBN: String
});
const Issue = new mongoose.model("Issue", issuedBookSchema);
const firstIssue = new Issue({
    issued_rollno: student1.student_rollno,
    issued_ISBN: book1.book_ISBN
});


Book.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            book1.save();
            book2.save();
        }
    }
    else console.log(err);
})
Lib.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            entry1.save();
            entry2.save();
        }
    }
    else console.log(err);
})
Student.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            student2.save();
            student1.save();
        }
    }
    else console.log(err);
})
Issue.find({}, function (err, found) {
    if (!err) {
        if (found.length === 0) {
            firstIssue.save();
        }
    }
    else console.log(err);
})





// var bname = "physi";
// bname = (_.toLower(bname));
// console.log(bname);

//================================================== Searching a book ==================================
app.post("/search", (req, res) => {
    // const bname = _.lowerCase(req.body.book_name);
    var bname = _.toUpper(req.body.searchQuery);
    console.log("bname--->");
    console.log(bname);

    Lib.find({ 'book.book_name': { $regex: bname } }, (err, found) => {
        var returnObject = {
            Status: true,
            Books: [],
            StatusMessage: "Found the books"
        }
        // console.log(found);
        // console.log("Searching a Book");
        if (err) {
            console.log(err);
            res.send({
                Status: false,
                Books: [],
                StatusMessage: err
            });
        }
        else if (found.length === 0) {
            res.send({
                Status: false,
                Books: [],
                StatusMessage: "No books found"
            });
        }
        else {
            // console.log(found);
            found.forEach((item) => {
                var obj = {

                    "book_name": _.startCase(item.book.book_name),
                    "book_ISBN": item.book.book_ISBN,
                    "book_author": item.book.book_author,
                    "book_genre": item.book.book_genre,
                    "book_count": item.count
                }
                returnObject.Books.push(obj);
            });
            console.log("REQ.BODY ---->");
            console.log(req.body);
            console.log("Return Object ---->");
            console.log(returnObject);
            res.send(returnObject);
        }
    });
});


//================================================= Add a book to library ==============================
app.post("/addBook", function (req, res) {
    console.log("entered");
    const bISBN = _.toUpper(req.body.book_ISBN);
    Book.findOne({ book_ISBN: bISBN }, function (err, found) {
        var returnObject = {
            Status: true,
            StatusMessage: "Added the book to the library"
        };

        if (!err) {

            if (!found) {
                const incrementValue = req.body.count;
                const inbook = new Book({
                    book_name: _.toUpper(req.body.book_name),
                    book_author: _.toUpper(req.body.book_author),
                    book_ISBN: _.toUpper(req.body.book_ISBN),
                    book_genre: _.toUpper(req.body.book_genre),
                })
                inbook.save();
                const libinsert = new Lib({
                    book: inbook,
                    count: incrementValue
                })
                libinsert.save();
                console.log("Inserted");
                returnObject.Status = true;
            }
            else {
                const incrementValue = req.body.count;
                Lib.findOneAndUpdate({ 'book.book_ISBN': bISBN }, { $inc: { 'count': incrementValue } }, { new: true }, (err, updated) => {
                    if (err) {
                        res.send({
                            Status: false,
                            StatusMessage: err
                        });
                    } else {
                        console.log(updated);
                    }
                });
            }
        }
        else {
            returnObject.Status = false;
            returnObject.StatusMessage = err;
        }

        res.send(returnObject);
    });

});
//================================================= Remove a book from library ==============================
app.post("/removeBook", (req, res) => {
    const bISBN = _.toUpper(req.body.book_ISBN);
    const incrementValue = req.body.count;
    console.log(req.body);
    Lib.findOne({ 'book.book_ISBN': bISBN }, (err, found) => {
        var returnObject = {
            Status: true,
            StatusMessage: "Removed the book"
        };
        if (!err) {
            if (found) {
                console.log(found.count);
                console.log(incrementValue);
                if (found.count <= incrementValue) {
                    Lib.findOneAndDelete({ 'book.book_ISBN': bISBN }, (err, deleted) => {
                        console.log(deleted);
                    });
                    Book.findOneAndDelete({ 'book_ISBN': bISBN });
                }
                else {
                    Lib.findOneAndUpdate({ 'book.book_ISBN': bISBN }, { $inc: { count: -1 * incrementValue } }, { new: true }, (err, updated) => {
                        console.log(updated);
                    });
                }
            } else {
                returnObject.Status = false;
                returnObject.StatusMessage = "Book not found";
            }
        }
        else {
            returnObject.Status = false;
            returnObject.StatusMessage = err;
        }
        res.send(returnObject);
    });
});




//============================================== Issue a book ==========================================
app.post("/issue", (req, res) => {
    console.log("Issuing")

    const SRollNo = _.toUpper(req.body.student_rollno);
    const IssuedBook = _.toUpper(req.body.book_ISBN);

    Lib.findOneAndUpdate({ 'book.book_ISBN': IssuedBook }, { $inc: { 'count': -1 } }, { new: true }, (err, updated) => {

        var returnObject = {
            Status: true,
            StatusMessage: "Issued the book"
        };
        if (err) {
            returnObject.Status = false;
            returnObject.StatusMessage = "err";
        }
        else if (!updated) {

            returnObject.Status = false;
            returnObject.StatusMessage = "Couldn't find the book";
        }
        else {
            returnObject.Status = true;
            console.log(updated);
            const NewIssue = new Issue({
                issued_rollno: SRollNo,
                issued_ISBN: IssuedBook
            });
            NewIssue.save();
        }
        res.send(returnObject);
    });

});


//========================================== Returning a book ==========================================
app.post("/return", (req, res) => {
    console.log("REturning a book")
    var returned_ISBN = _.toUpper(req.body.book_ISBN);
    var student_rollno = _.toUpper(req.body.student_rollno);

    Issue.findOneAndDelete({ 'issued_ISBN': returned_ISBN, 'issued_rollno': student_rollno }, (err, deleted) => {
        var returnObject = {
            Status: true,
            StatusMessage: "Book returned",
        };
        console.log(deleted);
        if (err) {
            returnObject.Status = false;
            returnObject.StatusMessage = "err";
        }
        else if (!deleted) {
            returnObject.Status = false;
            returnObject.StatusMessage = "Couldn't find the book";
        } else {
            var check = true;
            Lib.findOneAndUpdate({ 'book.book_ISBN': returned_ISBN }, { $inc: { 'count': 1 } }, { new: true }, (err, updated) => {
                if (updated) {
                    console.log(updated);
                }
            });
        }
        res.send(returnObject);
    });
});

//----------------------------Printing Files-------------------------



console.log("Checking");
const printerSchema = new mongoose.Schema({
    link: String,
    color: String,
    size: String,
    copies: Number,
    both: String,
    details: String,
    rollno: String
});

const Printer = new mongoose.model("Print", printerSchema);

//========================================= UPLOADING File ===========================

app.post('/upload', (req, res) => {
    console.log("Testing");
    console.log(req.body);
    let returnObj = {
        Status: false,
        StatusMessage: ""
    }
    if (req.body.link == "") {
        returnObj.StatusMessage = "Ops! No File Found";
    }
    else if (req.body.copies === 0) {
        returnObj.StatusMessage = "0 copies cannot be printed ;)";
    }
    else {
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
            rollno: rollno
        }
        const newPrint = new Printer({
            link: req.body.link,
            color: req.body.color,
            size: req.body.size,
            copies: req.body.copies,
            both: req.body.both,
            details: req.body.details,
            rollno: rollno
        })
        newPrint.save();

    }
    res.send(returnObj);
})
//========================================== PRINT ADMIN ================================

app.post('/printAdmin', (req, res) => {

    Printer.find({}, (err, found) => {
        let returnObj = {
            Status: false,
            StatusMessage: "",
            printArr: []
        }
        console.log(found.length);

        if (err) {
            returnObj.StatusMessage = err;
        }
        else {

            if (found.length == 0) {
                returnObj.StatusMessage = "No Pending Prints";
            }
            else {
                returnObj.Status = true;
                returnObj.printArr = found;
                console.log();
            }
        }
        res.send(returnObj);

    })
})
//For printing and deleting the printed query

app.post("/deleteAdmin", (req, res) => {
    const ID = req.body.deleteId;
    const rollno = req.body.rollno;
    const cost = req.body.cost;

    Printer.findOneAndDelete({ _id: ID }, (err, deleted) => {
        let returnObj = {
            Status: false,
            StatusMessage: "",
        }
        console.log(deleted);
        if (err) {
            returnObj.StatusMessage = "Not Able to delete";
        }
        else if (!deleted) {
            returnObj.Status = false;
            returnObj.StatusMessage = "Could Not Find !!";
        }
        else {
            returnObj.Status = true;
            returnObj.StatusMessage = "Deleted!!";

            Student.findOneAndUpdate({ student_rollno: rollno }, { $inc: { student_due: cost } }, { new: true },
                (err, updated) => {
                    console.log(updated);
                })
        }

        res.send(returnObj);
    })
})

app.post("/getProfile", (req, res) => {

    const email = req.body.email;
    console.log(email);
    const rollno = email.substr(0, 9);
    console.log(rollno);

    Student.findOne({ student_rollno: rollno }, (err, found) => {
        let returnObj = {
            Status: false,
            StatusMessage: "",
        }

        if (err) {
            returnObj.StatusMessage = err;
        }
        if (!found) {
            returnObj.StatusMessage = "Error 404,Student Not Found!!";
        }
        else {
            returnObj.Status = true;
            returnObj.student_name = found.student_name;
            returnObj.student_rollno = found.student_rollno;
            returnObj.student_due = found.student_due;
            let dig = rollno[4];
            if (dig == "1") {
                returnObj.student_branch = "CSE";
            }
            else if (dig == "2") {
                returnObj.student_branch = "EE";

            }
            else if (dig == "3") {
                returnObj.student_branch = "ME";
            }
        }
        console.log(returnObj);
        res.send(returnObj);
    })
})

//===================================================== Admin Searching Student Profile =========================
app.post("/adminStudentProfile", (req, res) => {
    // const email = req.body.email;
    const rollno = req.body.rollno;
    const costToDeduct = req.body.costToDeduct;
    // console.log(rollno);

    Student.findOneAndUpdate({ student_rollno: rollno }, { $inc: { student_due: -1 * costToDeduct } }, { new: true }, (err, found) => {

        let returnObj = {
            Status: false,
            StatusMessage: "",
        }

        if (err) {
            returnObj.StatusMessage = err;
        }
        if (!found) {
            returnObj.StatusMessage = "Error 404,Student Not Found!!";
        }
        else {
            returnObj.Status = true;
            returnObj.student_name = found.student_name;
            returnObj.student_rollno = found.student_rollno;
            returnObj.student_due = found.student_due;
            let dig = rollno[4];
            if (dig == "1") {
                returnObj.student_branch = "CSE";
            }
            else if (dig == "2") {
                returnObj.student_branch = "EE";

            }
            else if (dig == "3") {
                returnObj.student_branch = "ME";
            }
        }
        res.send(returnObj);
    })

});


let port = process.env.PORT;
if (port == null || port === "") {
    port = 5000;
}

app.listen(port, function () {
    console.log("Server started sucessfully");
});
