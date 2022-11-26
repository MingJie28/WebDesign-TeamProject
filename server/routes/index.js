// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User;

/* GET home page. wildcard */
router.get('/', (req, res, next) => {
  res.render('content/index', {
    title: 'Home',
    survey: '',
    displayName: req.user ? req.user.displayName : ''
   });
});
/* POST Route for processing the Login page */
router.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
      // server err?
      if(err)
      {
          return next(err);
      }
      // is there a user login error?
      if(!user)
      {
          req.flash('loginMessage', 'Authentication Error');
          return res.redirect('/login');
      }
      req.login(user, (err) => {
          // server error?
          if(err)
          {
              return next(err);
          }

          const payload = 
          {
              id: user._id,
              displayName: user.displayName,
              username: user.username,
              email: user.email
          }

          const authToken = jwt.sign(payload, DB.Secret, {
              expiresIn: 604800 // 1 week
          });
          
        //   return res.json({success: true, msg: 'User Logged in Successfully!', user: {
        //       id: user._id,
        //       displayName: user.displayName,
        //       username: user.username,
        //       email: user.email
        //   }, token: authToken});

          return res.redirect('/survey');
      });
  })(req, res, next);
});



/* GET Route for displaying the Register page */
//router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log("Error: Inserting New User");
          if(err.name == "UserExistsError")
          {
              req.flash(
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log('Error: User Already Exists!')
          }
          return res.render('auth/register',
          {
              title: 'Register',
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.displayName : ''
          });
      }
      else
      {
          // if no error exists, then registration is successful

          // redirect the user and authenticate them

          return passport.authenticate('local')(req, res, () => {
              res.redirect('/survey')
          });
      }
  });
});


/* GET to perform UserLogout */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
  res.json({success: true, msg: 'User Successfully Logged out!'});
});

router.get('/login', (req, res, next) => {
  // check if the user is already logged in
  if(!req.user)
  {
      res.render('auth/login', 
      {
         title: "Login",
         //messages: req.flash('loginMessage'),
         displayName: req.user ? req.user.displayName : '' 
      })
  }
  else
  {
      return res.redirect('/');
  }
});

router.get('/register', (req, res, next) => {
  // check if the user is not already logged in
  if(!req.user)
  {
      res.render('auth/register',
      {
          title: 'Register',
          //messages: req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName : ''
      });
  }
  else
  {
      return res.redirect('/');
  }
});


module.exports = router;
