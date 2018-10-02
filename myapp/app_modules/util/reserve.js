var PythonShell = require('python-shell');
var async = require('async');
var timestamp = new Date().getTime();
const knex = require('../db/knex.js');
const request = require('request');
module.exports = function(req, res, callback_list) {

  



  // function getDB(req, res){
  var reserved_list = [];
  // var sql ='SELECT Shilla_id, Shilla_pw, Shinsegae_id, Shinsegae_pw, Lotte_id, Lotte_pw FROM user_info WHERE User_info_id =?'

  knex.select().from('user_info').where('User_info_id', req.user.User_id)
    .then(function(results) {
      if (results[0] == undefined) {
        // var SL_reserved = '';
        // var SSG_reserved = '';
        // var lt_reserved = '';
        // req.session.lt_reserved = lt_reserved;
        // req.session.SL_reserved = SL_reserved;
        // req.session.SSG_reserved = SSG_reserved;
        //
        // res.redirect('/reserve');
        reserved_list[0]=false;
        reserved_list[1]=false;
        reserved_list[2]=false;
        console.log("RESERVED ",reserved_list);
        callback_list(reserved_list)
      } else {
        var SL_id = results[0].Shilla_id,
          // SL_pw = results[0].Shilla_pw,
          SSG_id = results[0].Shinsegae_id,
          // SSG_pw = results[0].Shinsegae_pw,
          LT_id = results[0].Lotte_id;
          // LT_pw = results[0].Lotte_pw;
          if(LT_id){
            reserved_list[0]=true;
          }
          else{
            reserved_list[0]=false;
          }
          if(SL_id){
            reserved_list[1]=true;
          }
          else{
            reserved_list[1]=false;
          }
          if(SSG_id){
            reserved_list[2]=true;
          }
          else{
            reserved_list[2]=false;
          }
          console.log(reserved_list);
          if(reserved_list){
            callback_list(reserved_list);
          }
      }
    })
    .catch(function(err) {
      reserved_list[0]=false;
      reserved_list[1]=false;
      reserved_list[2]=false;
      console.log(err);
      console.log("Get data from DB by " + req.user.User_id);
      callback_list(reserved_list)
    })


  // }

}
