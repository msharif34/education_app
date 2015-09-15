var express = require('express');
var router = express.Router();
var db = require('../models')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('courses/course-list');
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
