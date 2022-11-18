const { Message } = require('../models/message-model');
const Cryptr = require('cryptr');

const AddDetails = async (req, res, next) => {
  try {
    let cryptr = new Cryptr(req.body.message);
    console.log(req.body);
    let encstring = cryptr.encrypt(req.body.message);

    let message = new Message({
      message: encstring,
      user: req.userData.id,
    });
    await message.save();
    res.status(200).json({ message: 'Message added succesfully' });
  } catch (err) {
    console.log(err);
    res.status(400).send('unable to save database');
  }
};
module.exports = {
  AddDetails,
};
