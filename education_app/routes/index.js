var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin',  { layout: 'admin' });
});

router.get('/admin/login',function(req,res){
  res.render('admin/login');
});

//POST /login
//process login data and login admin
router.post('/admin/login',function(req,res){
  passport.authenticate(
    'local',
    {badRequestMessage:'You must enter e-mail and password.'},
    function(err,user,info){
      if(user){
        console.log(user)
        req.login(user,function(err){
          if(err) throw err;
          req.flash('success','Welcome back, '+ user.first_name +'. ' + 'You are now logged in.');
          res.redirect('/admin');
        });
      }else{
        req.flash('danger',info.message || 'Unknown error.');
        res.redirect('/auth/login');
      }
    }
  )(req,res);
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact/contact');
});

/* GET about page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET dashboard page. */
router.get('/dashboard', function(req, res, next) {
 db.course.findAll().then(function(data){
   res.render('courses/dashboard', {data:data});
 })
});

/* GET About US page */

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
