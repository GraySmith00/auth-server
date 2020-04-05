const User = require('../models/user');
const jwt = require('jwt-simple');
const Joi = require('@hapi/joi');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

// Validation
const schema = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().min(6).required(),
});

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  // Joi Validation
  const { error } = schema.validate(req.body);
  if (error && error.details.length) {
    return res.status(422).json({ error: error.details[0].message });
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

    res.json({ token: tokenForUser(user) });
  } catch (err) {
    return next(err);
  }
};
