const User = require('../models/user');
const jwt = require('jwt-simple');
const userValidation = require('../validation/userValidation');
const bcrypt = require('bcryptjs');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  const error = userValidation.getRegisterValidation(req.body);
  if (error && error.details.length) {
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    // Check for existing user with that email
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(422)
        .json({ error: 'A user with that email already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    const newUser = await user.save();

    if (newUser) {
      return res.json({
        id: newUser.id,
        password: newUser.password,
        token: tokenForUser(user),
        message: 'New user created successfully.',
      });
    } else {
      return res.json({
        error: "We're sorry, something went wrong.",
      });
    }
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validation
  const error = userValidation.getLoginValidation(req.body);
  if (error && error.details.length) {
    return res.status(422).json({ error: error.details[0].message });
  }

  try {
    // Check if email exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(400)
        .send({ error: 'Login credentials do no match our records.' });
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(400).send({ error: 'Incorrect password' });
    }

    // Validation passed
    return res.status('200').send({ message: 'Logged in successfully. ' });
  } catch (err) {
    return next(err);
  }
};
