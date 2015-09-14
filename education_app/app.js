var db = require('./models');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var auth = require('./routes/auth');
var path = require('path');
var logger = require('morgan');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

// require('./routes/config/passport')(passport); // pass passport for configuration
// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

//configure express
var app = express();
app.set('view engine','ejs');
app.use(ejsLayouts)
//load middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
  secret: 'asdvwettyiojdfvbnaekjfa',
  resave:false,
  saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user
  next();
});


//store user in session
passport.serializeUser(function(user,done){
  done(null, user.id);
});

//retrieve user from session
passport.deserializeUser(function(id,done){
  db.user.findById(id).then(function(user){
    done(null, user.get());
  }).catch(done);
});

passport.use(new LocalStrategy({
    usernameField:'email'
  },
  function(email,password,done){
    db.user.find({where:{email:email}}).then(function(user){
      if(user){
        console.log(user.password)
        //found the user
        user.checkPassword(password,function(err,result){
          if(err) return done(err);
          if(result){
            //good password
            console.log(result)
            done(null,user.get());
          }else{
            //bad password
            done(null,false,{message: 'Invalid Password.'});
          }
        });
      }else{
        //didn't find the user
        done(null,false,{message: 'Unknown user. Please sign up.'});
      }
    });
  }
));


app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/courses', courses);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
