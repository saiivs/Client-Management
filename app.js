var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helpers=require('handlebars-helpers')
const hbs = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/admin');

const HBS = hbs.create({});

var app = express();
const db=require('./config/connection');
var session=require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req,res,next)=>{
  if(!req.user){
    res.header('cache-control','private,no-cache,no-store,must ravalidate')
    res.header('Express','-3')
  }
  next();
})

app.use(session({secret:"key"}))
// mongodb connection
db.connect((err)=>{
  if(err) 
  console.log(err);
  else console.log("Database connected to 27017");
})

HBS.handlebars.registerHelper("ifCompare",function(v1,v2,options){
  if(v1===v2){
    return options.fn(this)
  }
  return options.inverse(this)
});



app.use('/', indexRouter);
app.use('/admin', usersRouter);

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
