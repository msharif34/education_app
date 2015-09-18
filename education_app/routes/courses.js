var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(req.user){
       db.course.findAll().then(function(data){
            db.user.find({
              where: {id: req.user.id},
              include: [db.course]
            }).then(function(user) {
              var courseMap = {};
              user.courses.forEach(function(item){
                courseMap[item.id]=true;
              });
            // res.send(user.courses);
            res.render('courses/course-list', {data:data, myCourses: user.courses, courseMap:courseMap});
          })
       })
    }else{
      db.course.findAll().then(function(data){
        res.render('courses/course-list', {data:data,courseMap:{}});
      })
    }
});

//Purchase a course
router.get('/:id', function(req, res, next) {
  if(!req.user){
            req.flash('danger','Please login to purchase this course.');
            res.redirect('/auth/login')
          }else{  
          db.course.findById(req.params.id).then(function(course){
                course.addUser(req.user.id).then(function(data){
                  req.flash('success','This course has been added to your dashboard.');
                  res.redirect('/dashboard')
                });
            });
          }
});
/* GET paid courses page. */
router.get('/watch/:title', function(req, res, next) {
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


router.get('/members', function(req, res, next) {
  res.render('courses/members');
});

router.get('/preview', function(req, res, next) {

	db.videos.findAll({where: {paid: true}}).then(function(data){
		// res.send(data)
  res.render('courses/preview', {data: data});
	})
});



module.exports = router;
