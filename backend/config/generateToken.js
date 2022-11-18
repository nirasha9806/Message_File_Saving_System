const jwt = require('jsonwebtoken');

const generateToken = (username, id) => {
  return jwt.sign({ username: username, id: id }, process.env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

module.exports = generateToken;
