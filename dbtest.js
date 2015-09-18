var db = require('./models');



db.user.find({where:{id: 2}
	}).then(function(user) {
	user.getCourses()
});


// Course.find('course_id_here').then(function(course){
//	  if(course){
//		req.user.addCourse(course).then...
//			res.redirect or send
//    else
//       show error
//

// req.user.addCourse(req.body.courseId).then(... 

	