var db = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact/contact');
});

router.post('/contact', function(req, res, next) {
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var email = req.body.email;
	var message = req.body.message;
	var title = req.body.title
		db.message.findOrCreate({ where: {
			first_name: first_name,
			last_name: last_name,
			email: email,
			title: title,
			message: message
		}}).then(function(data){
		req.flash('success','We have received your message, please give us upto 48hourse to respond.  Thank you!');
          res.redirect('/contact');
		});
});

















module.exports = router;