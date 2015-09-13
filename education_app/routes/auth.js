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
        req.login(user,function(err){
          if(err) throw err;
          req.flash('success','You are now logged in.');
          res.redirect('/restricted');
        });
      }else{
        res.send('Failed login')
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
    db.user.findOrCreate({where: {email: email, password: password}}).spread(function(data){
      console.log(data)
    })
    //user is signed up forward them to the home page
    res.redirect('/');
});

//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    req.logout();
    req.flash('info','You have been logged out.');
    res.redirect('/');
});


module.exports = router;