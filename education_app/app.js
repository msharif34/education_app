var db = require('./models');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var path = require('path');
var logger = require('morgan');
var ejsLayouts = require('express-ejs-layouts');
var FacebookStrategy = require('passport-facebook').Strategy;

var app = express();
var NODE_ENV = process.env.NODE_ENV || 'development';
var BASE_URL = NODE_ENV == 'production' ? 'https://myapp.herokuapps.com' : 'http://localhost:3000' ;
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

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: BASE_URL + '/auth/callback/facebook',
  profileFields: ['email','displayName']
},function(accessToken, refreshToken, profile, done){
  db.provider.find({
    where:{
      pid:profile.id,
      type:profile.provider
    },
    include:[db.user]
  }).then(function(provider){
    if(provider && provider.user){
      //login
      provider.token = accessToken;
      provider.save().then(function(){
        done(null,provider.user.get());
      });
    }else{
      //signup
      // console.log(profile);
      var email = profile.emails[0].value;
      db.user.findOrCreate({
        where:{email:email},
        defaults:{email:email,name:profile.displayName}
      }).spread(function(user,created){
        if(created){
          //user was created
          user.createProvider({
            pid:profile.id,
            token:accessToken,
            type:profile.provider
          }).then(function(){
            done(null,user.get());
          })
        }else{
          //signup failed
          done(null,false,{message:'You already signed up with this e-mail address. Please login.'})
        }
      });
    }
  });
}));


app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
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