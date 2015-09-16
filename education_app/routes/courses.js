var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.course.findAll().then(function(data){
		// res.send(data)
	  res.render('courses/course-list', {data:data});
	})
});
/* GET paid courses page. */
router.get('/:title', function(req, res, next) {
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
