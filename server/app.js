var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose
.connect(process.env.MONGODB_URL)
.then(() => console.log("Dabase connected"))
.catch((err) => console.log(err))

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const groupRouter = require('./routes/group');
const classRouter = require('./routes/class');
const planRouter = require('./routes/plan');
const inviteRouter = require('./routes/invite');
const shareRouter = require('./routes/share');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter)
app.use('/review', reviewRouter)
app.use('/group', groupRouter)
app.use('/class', classRouter)
app.use('/plan', planRouter)
app.use('/invite', inviteRouter)
app.use('/share', shareRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
