require('dotenv').config()
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URI);

  mongoose.connection.on('open', () => {
    console.log('Connected to Mongo')
  })
}

module.exports = main