const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    sparse: true,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
