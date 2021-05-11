const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
  issued_rollno: String,
  issued_ISBN: String,
});
module.exports = Issue = mongoose.model("issue", issuedBookSchema);
// const Issue = new mongoose.model("Issue", issuedBookSchema);
