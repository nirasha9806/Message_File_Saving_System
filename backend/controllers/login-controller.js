const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const generateToken = require('../config/generateToken');

const Login = async (req, res) => {
  const { username, password } = req.body;
  let isPassword = false;

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    isPassword = await bcrypt.compare(password, user.password);

    if (user && isPassword) {
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          type: user.userType,
          status: user.status,
          token: generateToken(user.username, user._id),
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid Password' });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.Login = Login;
