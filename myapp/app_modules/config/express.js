module.exports = function(){
  var express = require('express');
  var session = require('express-session');
  var MySQLStore = require('express-mysql-session')(session);
  var bodyParser = require('body-parser');
  var path = require('path');
  var app = express();
  require('dotenv').config({path: path.join(__dirname + '/../../.env')});



  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: '19q0iojd0129ijrol!',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
    },
    store:new MySQLStore({
<<<<<<< HEAD
      host:'localhost',
      port: 9000,
      user:'root',
      password:'1q2w3e',
      database:'capstonedb'
=======
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
>>>>>>> 9a1c9df
    })
  }));



  return app;
}
