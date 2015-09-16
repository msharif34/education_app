var db = require('./models');
var count = 0;


	db.course.findOrCreate({ where: {
						title: 'Basic Tajweed Course',
						instructor: 'Sheikh Abdiaziz Jama',
						description: 'Tayibun Academy is now offering a new and improved 7 level classical Fiqh beginners course. The beginners course is now taught in Somali!',
						image: 'images/abdiaziz.jpg',
						category: 'Quran',
						paid: true
						}}).spread(function(data){
							console.log(data)
							db.asset.create
							({
								title: 'Basic Tajweed Course 4',
								link: 'https://youtu.be/L33rYMQ5So0?list=PL8B4E99CA5DB960E6',
								type: 'video',
								courseId: data.id
							}).then(function(data){
								console.log(data)
							})
						});
