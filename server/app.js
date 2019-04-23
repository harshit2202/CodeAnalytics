var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const userController = require('../server/controllers/userController');
const problemController = require('../server/controllers/problemController');

const mongoose = require('mongoose');
const passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

require('./models/UserModel');
require('./models/HandleModel');
require('./models/ProblemModel');
require('./models/SubmissionModel');
//require('../server/Scrapers/codeforcesProblems');
//require('../server/Scrapers/codechefProblemscraper');


//DB Setup
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/CodeAnalytics');
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;


require('./config/passport');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/users', passport.authenticate('jwt', { session : false }) , usersRouter);
app.use('/submissions/:userId' ,userController.getSubmissions);
app.use('/problem' ,problemController.getProblem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({error : "Requested end point does not exists!"});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
