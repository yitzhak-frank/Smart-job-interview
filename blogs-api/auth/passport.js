const passport      = require('passport');
const bcrypt        = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const { UsersModel } = require('../models/users_model');

passport.use(new LocalStrategy (async (username, password, done) => {
  try {
    const user = await UsersModel.findOne({ username: username });
    if(!user) return done(null, false);

    const verify = await bcrypt.compare(password, user.password);
    if(!verify) return done(null, false);

    return done(null, user);
  } catch (err) {
    return done(err); 
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
 
passport.deserializeUser((id, done) => {
  UsersModel
    .findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
});