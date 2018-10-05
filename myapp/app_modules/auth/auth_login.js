module.exports = function(passport){
  var bkfd2Password = require("pbkdf2-password");
  var hasher = bkfd2Password();
  const knex = require('../db/knex.js');
  var route = require('express').Router();
  var PythonShell = require('python-shell');
  var request = require('request');


  route.post(
    '/login',
    passport.authenticate(
      'local',
      {
        successRedirect: '/user/mypage',
        failureRedirect: '/user/login_error',
        successFlash: true,
        failureFlash: true
      }
    )
  );


  route.post('/register', function(req, res){
    console.log(req.body);
     hasher({password:req.body.password}, function(err, pass, salt, hash){

       console.log(req.body);
       var user = {
          ID :'local:'+req.body.username,
          Password:hash,
          Username:req.body.displayName,
          Gender:"woman",
          Job:"student",
          // Gender:req.body.gender,
          // Job:req.body.job,
          // Age:req.body.age,
          Age:'0',
          Salt:salt,
          Email:req.body.email
        };
       knex('User').insert(user).then(function(list){

         request.post({
             url: 'http://localhost:5050/api/register_user',
             body:{
               user_id: list
             },
             json: true
           },
           function(error, response) {

             if(response.body=='success'){
               // req.login(user, function(err){
                 res.redirect("/");
                 // req.session.save(function(){
                 //   res.redirect('/user/mypage');
                 // });
               // });
             }
           }
         );
       }).catch(function(err){
         console.log(err);
         res.status(500);
       })
     });
   }
 );

 route.get('/logout', function(req, res){
   req.logout();
   //구글 logout 해야된다.
   req.session.save(function(){
     res.redirect('/');
   });
 });


 route.get('/check_id', function(req, res, next) {
  if (req.isAuthenticated())
    res.redirect('/');
  else
      return next();
  }, function(req, res, next) {
    var email = 'local:'+req.param('id');
    console.log("got " + email);
    knex.select().from("User").where('ID', email)
      .then(function(rows) {
        if (rows.length == 0) {
          console.log(rows[0]);
          res.send({
            result: 0
          });
        } else {
          res.send({
            result: 1
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      })
  });

 //ID 중복체zm
 // route.post('/id_check', function(req, res){
 //   var id = req.body.username;
 //   var sql = "select *  from user WHERE ID = 'local:"+id+"';"
 //   conn.query(sql,function(err, results){
 //     if(err){
 //       console.log(err);
 //       res.status(500);
 //     } else {
 //       //일치하는것이 없는경우
 //       if(results[0]==undefined){
 //         //세션에 사용가능한 아이디 저장
 //         req.session.username=id;
 //         res.redirect('/register_checked');
 //       }
 //       else{
 //        res.redirect('/popup/id_check_error');
 //       }
 //     }
 //   });
 // });

//비밀번호 변경을 위한 비밀번호 확
 route.post('/pw_check', function(req, res){
   hasher({password:req.body.password, salt:req.user.Salt}, function(err, pass, salt, hash){
     // var sql = 'SELECT Password from User where User_id= ? ';
     knex.select('Password').from('User').where('User_id',req.user._id)
     .then(
       function(results){
         if(results[0].Password===hash){
             res.redirect('/user/User_info_modify');
         }
         else{
           res.redirect('/user/password_input_error')
         }
       }
     )
     .catch(function(err){
       console.log(err);
       res.status(500);
     }
     )
   });
 });


//비밀번호 변경
 route.post('/update', function(req, res){
    hasher({password:req.body.password}, function(err, pass, salt, hash){

      // var sql = 'UPDATE User SET Password = ?, Salt =? , Email =?  where User_id= ? ';
      knex.from('User').where('User_id',req.user._id).update({
        'Password' : hash,
        'Salt' : salt,
        'Email' : req.body.email
      })
      .then(
        function(){

            req.user.Email = req.body.email;

            res.redirect('/user/mypage');
        }
      )
      .catch(
        function(err){
          console.log(err);
          res.status(500);
        }
      )
    });
  }
);




route.post('/lottemembership', function(req, res){
    //DB관련 문제 해결 필요 User_info_id

     var options_lt = {
       mode: 'text',
       // pythonPath: '',
       pythonOptions: ['-u'],
       scriptPath: '',
       args: [req.body.username,req.body.password]
     }
     var bodys = {
        user_id : req.user._id,
       options : options_lt
     }
     request.post({
       url: 'http://localhost:5050/api/checklottemembership',
       body: bodys,
       json: true
      },
      function(error, response, body) {
        if(body=='lotte success'){
          res.json("success");
          // res.redirect('/popup/success');
        }
        else{
          res.json("fail");
          // res.redirect('/popup/lotte_error');
        }
      });
 }
);

//면세점 연동 - 신라


route.post('/shinlamembership', function(req, res){
     var options_sl = {
       mode: 'text',
       // pythonPath: '',
       pythonOptions: ['-u'],
       scriptPath: '',
       args: [req.body.username,req.body.password]
     }
     var bodys = {
       user_id : req.user._id,
       options : options_sl
     }
     request.post({
       url: 'http://localhost:5050/api/checkshinlamembership',
       body: bodys,
       json: true
      },
      function(error, response, body) {
        if(body=='shinla success'){
          // res.redirect('/popup/success');
          res.json("success");
        }
        else{
          // res.redirect('/popup/shilla_error');
          res.json("fail");
        }
      });
 }
);


//면세점 연동 - 신세계


route.post('/ssgmembership', function(req, res){
     var options_ssg = {
       mode: 'text',
       // pythonPath: '',
       pythonOptions: ['-u'],
       scriptPath: '',
       args: [req.body.username,req.body.password]
     }
     var bodys = {
        user_id : req.user._id,
       options : options_ssg
     }
     request.post({
       url: 'http://localhost:5050/api/checkssgmembership',
       body: bodys,
       json: true
      },
      function(error, response, body) {
        if(body=='ssg success'){
          // res.redirect('/popup/success');
          res.json("success");
        }
        else{
          // res.redirect('/popup/shilla_error');
          res.json("fail");
        }
      });
 }
);




   return route;

}
