const express    = require('express');
const bcrypt     = require('bcrypt');
const UsersModel = require('../models/users_model');
const passport   = require('passport');
const router     = express.Router();

router.post('/sign-up', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new UsersModel(req.body);
    const result = await user.save();

    res.status(201).json({...result._doc, password: 'password secured'});
  } catch(err) {
    res.status(400).json(err);
  }
});

router.post('/login',
  passport.authenticate('local', {failureRedirect: '/users/login-failure', failureFlash: true}), 
  (req, res) => res.json('Successfully login')
);

router.get('/login-failure', (req, res) => res.status(401).json('login failed'));

router.get('/logout', (req, res) => {
  req.logout();
  res.json('Successfully logout');
});

module.exports = router;
