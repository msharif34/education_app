var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

//GET /auth/login
//display login form
router.get('/login',function(req,res){
    res.render('login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
  passport.authenticate(
    'local',
    {badRequestMessage:'You must enter e-mail and password.'},
    function(err,user,info){
      if(user){
        console.log(user)
        req.login(user,function(err){
          if(err) throw err;
          req.flash('success','Welcome back, '+ user.first_name +'. ' + 'You are now logged in.');
          res.redirect('/dashboard');
        });
      }else{
        req.flash('danger',info.message || 'Unknown error.');
        res.redirect('/auth/login');
      }
    }
  )(req,res);
});
//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){
    //do sign up here (add user to database)
    var email = req.body.email
    var password = req.body.password
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var password_confirmation = req.body.password_confirmation
    console.log(email, password, password_confirmation, first_name, last_name)
      if(password != password_confirmation){
       req.flash('danger','Passwords do not match, please try again.');
       res.redirect('/auth/signup')
       return
      }
    db.user.findOrCreate({where: {
                         email: email
                       },
                          defaults:{
                          first_name: first_name,
                          last_name: last_name,
                          email: email,
                          password: password,
                          password_confirmation: password_confirmation
                          }}).spread(function(user, created){
                            if(created){
                              req.flash('success', 'Assalamu Alaikum '+  first_name +', ' + 'Welcome to Tayibun!');
                              req.login(user,function(err){
                                if(err) throw err;
                                req.flash('success','You are now logged in.');
                                res.redirect('/dashboard');
                              });
                            }else{
                               req.flash('danger','This email is already in use. Please try another email address.');
                                res.redirect('/');
                            }
                            })
    //user is signed up forward them to the home page
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/');
});

router.get('/login/:provider',function(req,res){
  passport.authenticate(
    req.params.provider,
    {scope:['public_profile','email']}
  )(req,res);
});

router.get('/callback/:provider',function(req,res){
  passport.authenticate(req.params.provider,function(err,user,info){
    if(err) throw err;
    if(user){
      req.login(user,function(err){
        if(err) throw err;
        req.flash('success','You are now logged in.');
        res.redirect('/dashboard')
      });
    }else{
      var errorMsg = info && info.message ? info.message : 'Unknown error';
      req.flash('danger',errorMsg);
      res.redirect('/auth/login')
    }
  })(req,res);
});

module.exports = router;