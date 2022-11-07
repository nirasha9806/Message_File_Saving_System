const mongoose = require("mongoose");

const userDetails = mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
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

module.exports = mongoose.model("userDetails", userDetails);
