// var app = require('./app_modules/config/express')();

var express = require('express');
var app = express();
var passport = require('./app_modules/auth/passport')(app);
var getEvent = require('./app_modules/util/getEvent');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category_router');
var productRouter = require('./routes/product_router');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var sassMiddleware = require('node-sass-middleware');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var bodyParser = require('body-parser');
// view engine setup
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret: '19q0iojd0129ijrol!',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
//   },
//   store:new MySQLStore({
//     host:'localhost',
//     port:9000,
//     user:'root',
//     password:'1q2w3e',
//     database:'capstonedb'
//   })
// }));
app.use(session({
  secret: Date.now() + 'cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/user', usersRouter);
// app.use('/category', CategoryRouter);
app.use('/product', productRouter);
//auth 과정
var auth = require('./app_modules/auth/auth_login')(passport);
// '/auth/' 자동으로 가져간다. 고로 auth_login에서는 뒤에있는 login이나 logout같은것만 가져간다.
app.use('/auth/', auth);
//popup 과정
var popup = require('./routes/popup');
// '/popup/' 자동으로 가져간다.
app.use('/popup/', popup);

app.use(express.static(path.join(__dirname, '/public')));
app.use('/user', express.static(path.join(__dirname, '/public')));
app.use('/popup/', express.static(path.join(__dirname, '/public')));
app.use('/auth/', express.static(path.join(__dirname, '/public')));
// app.use('/category/', express.static(path.join(__dirname, '/public')));
app.use('/product/', express.static(path.join(__dirname, '/public')));
app.use('/product/single', express.static(path.join(__dirname, '/public')));
module.exports = app;
