var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('admin',  { layout: 'admin' });
});

/* GET admin/charts page. */
router.get('/admin/charts', function(req, res, next) {
  res.render('admin/charts',  { layout: 'admin' });
});


//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
    if(req.isAuthenticated()){
      res.render('restricted');
    }else{
      req.flash('danger','Access Denied.');
      res.redirect('/');
    }
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

/* GET paid courses page. */
router.get('/courses/:title', function(req, res, next) {
  var title = req.params
  db.course.findAll({where: {
                  title: title.title.replace(/-/g, ' ')
                  }}).then(function(data){
                    var courseId = data[0].id
                    db.asset.findAll({where: {
                      courseId: courseId
                    }}).then(function(course){
                      console.log(course)
                      res.render('courses/show', {course: course,
                                                  data: data
                                                  })
                    })
                  })
});
module.exports = router;
