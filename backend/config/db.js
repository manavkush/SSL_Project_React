const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const config = require("config");
// const db = config.get("mongoURI");
// const db = process.env.mongoURI;
// dotenv.config();
const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lk5fo.mongodb.net/Lib-management?retryWrites=true&w=majority`;

const connectDB = async () => {
  console.log(connectionString);
  try {
    console.log(connectionString);
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);

    // Exit with failure
    process.exit(1);
  }
};

module.exports = connectDB;
