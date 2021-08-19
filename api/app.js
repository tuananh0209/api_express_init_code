const express = require('express');
const cookieParser = require('cookie-parser')
// const mongoose = require('mongoose')
const path = require('path')
var logger = require('morgan');
var createError = require('http-errors');
const {sequelize, connectMongoDB} = require('./dbConfig')
const io = require('./sockets/init')
require('dotenv').config();

var indexRouter = require('./routers/index');
const FAQRouter = require('./routers/FAQ.router')
const userRouter = require('./routers/user.router')

const sessionMiddleware = require('./middleware/session.middleware')
const authnMiddleWare = require('./middleware/auth.middleware').auth
// mongoose.connect(process.env.MONGO_URL, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
//     serverSelectionTimeoutMS: 5000 
// }).catch(err => console.log(err)); 

// mongoose.set('useFindAndModify', false);

// sequelize.sync() 
connectMongoDB()

const app = express();

app.set('view engine', 'pug'); 
app.set('views', './views');

app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(sessionMiddleware)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  req.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
  req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  X-Auth-Token');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,  X-Auth-Token');
  next();
});


// io.on('connection', socket=>{
//   console.log(socket)
// })

app.use('/',indexRouter);
app.use('/FAQ', FAQRouter);
app.use('/users', userRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app