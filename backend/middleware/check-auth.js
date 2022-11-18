const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req?.headers['authorization']?.split(' ')[1];

  if (!token) {
    return next(res.send({ message: 'authorization failed' }));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(res.send({ message: 'authorization ' }));
      }
      req.userData = {
        id: decoded?.id,
        username: decoded?.username,
      };
    });
    next();
  } catch (err) {
    console.log(err);
    return next(res.send({ message: 'authorization failed' }));
  }
};
