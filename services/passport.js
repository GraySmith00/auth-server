const passport = require('passport');
const User = require('../models/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  // see if user id in payload exists in db, if so call done w user
  try {
    const user = await User.findById(payload);
    user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

// tell passport to use this strategy
passport.use(jwtLogin);
