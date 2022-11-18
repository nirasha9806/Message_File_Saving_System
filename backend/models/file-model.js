const mongoose = require('mongoose');

const fileSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    fileId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timesamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = { File };
