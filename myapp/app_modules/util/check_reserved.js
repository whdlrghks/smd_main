module.exports = function(){
  var conn = require('./db')();
  var route = require('express').Router();
  var PythonShell = require('python-shell');
  var async = require('async');
  var timestamp = new Date().getTime();

  function getDB(req, res){
    var sql ='SELECT Shilla_id, Shilla_pw, Shinsegae_id, Shinsegae_pw, Lotte_id, Lotte_pw FROM user_info WHERE User_info_id =?'
    conn.query(sql, req.user.User_id, function(err,results){
      if(err){
        console.log("Get data from DB by"+req.user.User_id);
        res.status(500);
      }
      else{
        if(results[0]==undefined){
          var SL_reserved='';
          var SSG_reserved='';
          var lt_reserved='';
          req.session.lt_reserved = lt_reserved;
          req.session.SL_reserved = SL_reserved;
          req.session.SSG_reserved = SSG_reserved;

          res.redirect('/reserve');
        }
        else{
        var SL_id = results[0].Shilla_id,
        SL_pw = results[0].Shilla_pw,
        SSG_id = results[0].Shinsegae_id,
        SSG_pw = results[0].Shinsegae_pw,
        LT_id = results[0].Lotte_id,
        LT_pw = results[0].Lotte_pw;
        var options_sl={
          mode: 'text',
         pythonPath: '',
         pythonOptions: ['-u'],
         scriptPath: '',
         args: [SL_id,SL_pw]
        }
        var options_ssg={
          mode: 'text',
         pythonPath: '',
         pythonOptions: ['-u'],
         scriptPath: '',
         args: [SSG_id,SSG_pw]
        }
        var options_lt={
          mode: 'text',
         pythonPath: '',
         pythonOptions: ['-u'],
         scriptPath: '',
         args: [LT_id,LT_pw]
        }
        var SL_reserved='';
        var SSG_reserved='';
        var lt_reserved='';
        var timestamp = new Date().getTime();
        async.parallel([
          function(callback){
          if(LT_id !=null){
            PythonShell.run('./python/reserveDutyfree/getLotte.py', options_lt, function (err, results_LT) {
              if (err) throw err;
              lt_reserved=results_LT;
              callback(null,results_LT);
            });}
            else callback(null,'null');
          },
          function(callback){
          if(SL_id !=null){
            PythonShell.run('./python/reserveDutyfree/getShinla.py', options_sl, function (err, results_SL) {
              if (err) throw err;
              SL_reserved=results_SL;
              callback(null,results_SL);
            });
          }
          else callback(null,'null');
          },
          function(callback){
          if(SSG_id !=null){
            PythonShell.run('./python/reserveDutyfree/getSSG.py', options_ssg, function (err, results_SSG) {
              if (err) throw err;
              SSG_reserved=results_SSG;
              callback(null,results_SSG);
            });}
            else callback(null,'null');
          }

        ],function(err,result){
          console.log(result, 'in ', new Date().getTime() - timestamp, 'ms');
          //세션에 저장해서 보내는 경우 문제가 있음 변수로 전송필요
          req.session.lt_reserved = lt_reserved;
          req.session.SL_reserved = SL_reserved;
          req.session.SSG_reserved = SSG_reserved;

          res.redirect('/reserve');
        })
      }
      }
    })
  }



//사용자의 아이디로 DB에서 연동된 아이디 비밀번호 가져온다. 그런다음  각각 가져온다.
  route.get('/', function(req, res){
    console.log("Tset");
    getDB(req,res);
   }
  );
   return route;

}
