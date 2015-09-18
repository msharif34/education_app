var express = require('express');
var router = express.Router();
var db = require('../models');
var stripe = require("stripe")(process.env.STRIPE_API_KEY);


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

// Route for Stripe
router.post('/charge', function(req, res) {

  var stripeToken = req.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    card: stripeToken,
    description: "payinguser@example.com"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.send(err);
    } else if(err){
      res.send(err);
    } else {
      //Render a thank you page called "Charge"
      res.send('payment good');
    }
  });

});
//Purchase a course
router.post('/buy/:id', function(req, res, next) {
  if(!req.user){
            req.flash('danger','Please login to purchase this course.');
            res.redirect('/auth/login')
          }else{
          var stripeToken = req.body.stripeToken;

          var charge = stripe.charges.create({
            amount: 999, // amount in cents, again
            currency: "usd",
            card: stripeToken,
            description: "payinguser@example.com"
          }, function(err, charge) {
            if (err && err.type === 'StripeCardError') {
              // The card has been declined
              req.flash('danger','This card has been declined.');
            res.redirect('/')
            } else {
              //Render a thank you page called "Charge"
              db.course.findById(req.params.id).then(function(course){
                course.addUser(req.user.id).then(function(data){
                  req.flash('success','This course has been added to your dashboard.');
                  res.redirect('/dashboard')
                });
            });
            }
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




module.exports = router;
