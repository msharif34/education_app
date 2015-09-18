var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET admin courses page. */
router.get('/admin/courses', function(req, res, next) {
  db.course.findAll().then(function(courses){
    // res.send(courses)
    res.render('admin/courses',  { layout: 'admin/adminLayout',
                            courses: courses });
  })
});


/* POST admin courses page. */
router.post('/admin/courses', function(req, res, next) {
  var status = req.body.status.replace(/['"]+/g, '')
  console.log(status)
    db.course.create({title: req.body.title,
      instructor: req.body.instructor,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      paid: status,
    }).then(function(course){
      db.asset.create
      res.redirect('/admin/courses')
  })
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  db.course.findAll().then(function(courses){
    db.message.findAll().then(function(messages){
      db.user.findAll().then(function(users){
       res.render('admin',  { layout: 'admin',
                            courses: courses,
                            messages: messages,
                            users: users });
      })
    })
  })
});

router.get('/admin/login',function(req,res){
  res.render('admin/login');
});

router.get('/admin/messages',function(req,res){
  db.message.findAll().then(function(messages){
    // res.send(data)
  res.render('admin/messages', {layout:'admin/adminLayout',
                                messages:messages});
  })
});

router.get('/admin/messages/:id',function(req,res){
  var id = req.params.id;
  db.message.find({where: {id: id}}).then(function(data){
    // res.send(data)
  res.render('admin/show', {data:data});
  })
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
  if(!req.user){
    req.flash('danger','You must be logged in to view the dashboard.');
        res.redirect('/auth/login');
  }else{ 
   db.course.findAll().then(function(data){
        db.user.find({
          where: {id: req.user.id},
          include: [db.course]
        }).then(function(user) {
        // res.send(user.courses);
     res.render('courses/dashboard', {data:data, myCourses: user.courses});
      })
   })
  }
});

/* GET About US page */

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
