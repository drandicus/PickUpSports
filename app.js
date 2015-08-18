//Set Up ============================================
var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var passport        = require('passport');
var expressSession  = require('express-session');
var flash           = require('connect-flash')

var app = express();
app.use(flash());

//Connect Mongoose ==================================
mongoose.connect("mongodb://localhost:27017/pickup");

//Configuring Passport ==============================
app.use(expressSession({secret: 'pleasework'}));
app.use(passport.initialize());
app.use(passport.session());

//View Engine Setup =================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//Not Sure what is going on here ====================
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Initialize Passport ==============================
var initPassport = require('./passport/init');
initPassport(passport);

//Setting up the Routes ============================
var routes = require('./routes/index')(passport);
app.use('/', routes);

//Setting up the API
var api = require('./api/index')(passport);
app.use('/api', api);

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
