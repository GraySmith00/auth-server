const jwt = require('jwt-simple');

const getUserToken = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode(
    { user: { id: user.id, email: user.email }, iat: timestamp },
    process.env.SECRET
  );
};

module.exports = getUserToken;
