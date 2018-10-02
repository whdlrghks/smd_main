const knex = require('../db/knex.js');
// var conn = require('./db')();
var pbkfd2Password = require("pbkdf2-password");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hasher = pbkfd2Password();
var sendrest = require('../util/sendrest');
module.exports = function(app){

  // app.use(passport.initialize());
  // app.use(passport.session());

  //인증후 사용자 정보를 세션에 저장
  passport.serializeUser(function(user, done) {
     console.log('serializeUser', user.Username);
     done(null, user);
   });

//인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
   passport.deserializeUser(function(user, done) {
     console.log('deserializeUser', user.Username);
     done(null, user);
   });

   passport.use(new LocalStrategy(
     function(username, password, done){
       var id = username;
       var pwd = password;
       knex.select().from('User').where('ID',['local:'+id])
        .then(function(rows){
          if(rows.length===0){
            return done('There is no user.');
          }
          else{
            var user = rows[0];
            var session = {
              Username : user.Username,
              User_id : user.User_id,
              Gender : user.Gender,
              Age : user.Age,
              Salt : user.Salt,
              Email : user.Email
            }
            if(user)
            {
             return hasher({password:pwd, salt:user.Salt}, function(err, pass, salt, hash){
               if(hash === user.Password){
                 console.log('[INFO] ' + user.Username + ' IS LOGGED IN');
                 //rest
                 sendrest.getlogin(user.User_id, function(result) {
                   console.log('LocalStrategy', session);
                   done(null, session);
                 })
               } else {
                 done(null, false);
               }
             });
           }
           else done(null, false);
          }
        })
        .catch(function(err) {
          console.log(err);
          return done(false, null);
        });


     }
   ));
   //
   // passport.use(new GoogleDriveStrategy({
   //     clientID: '1020724062873-q2905dvpi2rkp2afc5geu3ib136mo21e.apps.googleusercontent.com',
   //     clientSecret: 'wYcSZSLwufXFLAaH7xFi9Rby',
   //     callbackURL: "http://localhost:3000/auth/google/callback"
   //   },
   //   function( accessToken, refreshToken, profile, done) {
   //       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
   //
   //     console.log("Accesstoken : " + accessToken);
   //     console.log("RefreshToken : " + refreshToken);
   //     console.log("Profile : " + profile.id);
   //     var token= {
   //        accesstoken : accessToken,
   //        refreshtoken : refreshToken
   //
   //     }
   //     // var user = {
   //     //     access : accessToken,
   //     //     refresh : refreshToken,
   //     //     name : profile
   //     //   };
   //          return done(null, token);
   //       // });
   //   }
   // ));



   return passport;
}
