const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    message: {
      type: String,
    },
  },
  { timesamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = { Message };
