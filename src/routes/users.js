const router = require('express').Router();
const passport = require('passport');
module.exports = router;

// Models
const User = require('../models/User');

router.get('/users/register', (req, res) => {
  res.render('users/register');
});

router.post('/users/register', async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if(password != confirm_password) {
    errors.push({text: 'Las contraseñas no coinciden.'});
  }
  if(password.length < 4) {
    errors.push({text: 'La contraseña debe contener por lo menos 4 caracteres.'})
  }
  if(errors.length > 0){
    res.render('users/register', {errors, name, email, password, confirm_password});
  } else {
    // Look for email coincidence
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
      req.flash('error_msg', 'Alerta! E-Mail en uso.');
      res.redirect('/users/register');
    } else {
      // Saving a New User
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'Registrado!');
      res.redirect('/users/login');
    }
  }
});

router.get('/users/login', (req, res) => {
  res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/notes',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Sesión cerrada.');
  res.redirect('/users/login');
});