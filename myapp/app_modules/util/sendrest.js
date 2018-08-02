"use strict";

/**
 *
 * @author ikhwan
 *
 * @description This module is composed of convenient functions of dropbox
 *
 */

var async = require('async'),
  request = require('request'),
  mime = require('mime');
const knex = require('../db/knex.js');

const UTIL = (function() {

  // var connection = db_con.init();

  /****************************************************************************
   * @description simplify connection with db pool
   * @param {callback}
   *
   */

  var getSLreserved_REST = function(user_id, callback) {
    var user_id = user_id;
    knex.select().from('user_info').where('User_info_id', user_id)
      .then(function(results) {
        if (results[0] == undefined) {
          callback("no result")
        } else {
          var SL_id = results[0].Shilla_id,
            SL_pw = results[0].Shilla_pw;
          
          var options_sl = {
            mode: 'text',
            pythonPath: '',
            pythonOptions: ['-u'],
            scriptPath: '',
            args: [SL_id, SL_pw]
          }
          request.post({
              url: 'http://localhost:5050/api/getslreserved',
              body: options_sl,
              json: true
            },
            function(error, response, body) {
              callback(body);
            }
          );
        }
      })
      .catch(function(err) {
        console.log("[GETSLRESERVED_REST] 'S ERROR" +err);
      })

  }


    var getLTreserved_REST = function(user_id, callback) {
      var user_id = user_id;
      knex.select().from('user_info').where('User_info_id', user_id)
        .then(function(results) {
          if (results[0] == undefined) {
            callback("no result")
          } else {
            var LT_id = results[0].Lotte_id,
              LT_pw = results[0].Lotte_pw;
            var options_lt = {
              mode: 'text',
              pythonPath: '',
              pythonOptions: ['-u'],
              scriptPath: '',
              args: [LT_id, LT_pw]
            }
            request.post({
                url: 'http://localhost:5050/api/getltreserved',
                body: options_lt,
                json: true
              },
              function(error, response, body) {
                callback(body);
              }
            );
          }
        })
        .catch(function(err) {
          console.log("[GETSLRESERVED_REST] 'S ERROR" +err);
        })

    }

      var getSSGreserved_REST = function(user_id, callback) {
        var user_id = user_id;
        knex.select().from('user_info').where('User_info_id', user_id)
          .then(function(results) {
            if (results[0] == undefined) {
              callback("no result")
            } else {
              var SSG_id = results[0].Shinsegae_id,
                SSG_pw = results[0].Shinsegae_pw;
              var options_ssg = {
                mode: 'text',
                pythonPath: '',
                pythonOptions: ['-u'],
                scriptPath: '',
                args: [SSG_id, SSG_pw]
              }
              request.post({
                  url: 'http://localhost:5050/api/getssgreserved',
                  body: options_ssg,
                  json: true
                },
                function(error, response, body) {
                  callback(body);
                }
              );
            }
          })
          .catch(function(err) {
            console.log("[GETSLRESERVED_REST] 'S ERROR" +err);
          })

      }




  return {
      getSLreserved : getSLreserved_REST,
      getLTreserved : getLTreserved_REST,
      getSSGreserved : getSSGreserved_REST

  }

})();

module.exports = UTIL;
