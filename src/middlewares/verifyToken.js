const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token =
    req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) return res.status(401).send({ error: 'Not Authorized' });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid Token' });
  }
};

module.exports = verifyToken;
