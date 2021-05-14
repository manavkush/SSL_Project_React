const mongoose = require("mongoose");
const { bookSchema } = require("./Book");

const libSchema = new mongoose.Schema({
  book: {
    type: bookSchema,
  },
  count: Number,
});

module.exports = Lib = mongoose.model("lib", libSchema);
