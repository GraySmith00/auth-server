const jwt = require('jsonwebtoken');

const getUserToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.sign(
    { user: { id: user._id, email: user.email }, iat: timestamp },
    process.env.TOKEN_SECRET
  );
};

module.exports = getUserToken;
