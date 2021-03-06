//Requires
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const convertcsv = require('csvtojson');

const mysql = require('mysql');
const host = "localhost";
const user = "root";
const pass = "dbuserdbuser";
const database = "currentcongress";

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mapRouter = require('./routes/map');
const actionRouter = require('./routes/action');
const extensionRouter = require('./routes/extension');
const senatorRouter = require('./routes/senator');
const eventRouter = require('./routes/event');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);
app.use('/action', actionRouter);
app.use('/extension', extensionRouter);
app.use('/senator/:id', senatorRouter);
app.use('/event/:id', eventRouter);

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