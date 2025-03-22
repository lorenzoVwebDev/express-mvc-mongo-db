const mongoose = require('mongoose');
require('dotenv').config()
const { errorCreator } = require('../configuration/commonFunctions.js')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useUnifiedTpolgy: true,
      useNewUrlParse: true
    });

  } catch (error) {
    console.error(error)
  }
}

module.exports = connectDB