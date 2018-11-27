const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const requiredParams = ['email', 'password'];

  for (let param of requiredParams) {
    if (!req.body[param]) {
      return res
        .status(422)
        .json({
          error: `Expected format: { email: <String>, password: <String> }. You're missing a "${param}" property.`
        });
    }
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: 'A user with that email already exists.' });
    }
    const user = new User({ email, password });
    await user.save();
    res.json({ _id: user._id, email: user.email });
  } catch (err) {
    return next(err);
  }
};
