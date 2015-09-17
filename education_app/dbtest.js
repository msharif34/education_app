var db = require('./models');



db.user.findOrCreate({where:
	{first_name: 'mukhtar'}
}).spread(function(user, created) {
	user.createCourse({title: 'test title', instructor: 'sharif'}).then(function(course) {
		console.log(course)
	});
});