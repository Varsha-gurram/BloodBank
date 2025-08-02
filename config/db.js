const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB in ${process.env.DEV_MODE} mode at host ${mongoose.connection.host}`.bgCyan.white);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
