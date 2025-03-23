const mongoose = require('mongoose');
const dayjs = require('dayjs')

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true
  }, 
  refreshToken: String,
  roles: {
    User: {
      type: Number,
      populate: 2001
    }, 
    Editor: Number,
    Admin: Number
  }, 
  datestamp: {type: Number, populate: dayjs().add(30, 'day').unix()
  },
  lastattempt: {type: Number, min: dayjs().unix()},
  validattempt: {type: Number, min: dayjs().unix()}
});

module.exports = mongoose.model('usersDB', userSchema)