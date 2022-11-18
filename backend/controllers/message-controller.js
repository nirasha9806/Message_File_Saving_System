const { Message } = require('../models/message-model');
const Cryptr = require('cryptr');

const AddDetails = async (req, res, next) => {
  try {
    console.log(req.body);

    let cryptr = new Cryptr(req.body.message);
    let encstring = cryptr.encrypt(req.body.message);

    let message = new Message({
      message: encstring,
      user: req.userData.id,
    });
    await message.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: 'unable to save database' });
  }
};
module.exports = {
  AddDetails,
};
