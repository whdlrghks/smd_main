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
          console.log("SL_ID : ", SL_id , "SL_PW : "+ SL_pw);
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
        console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
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
          console.log("LT_id : ", LT_id , "LT_pw : "+ LT_pw);
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
        console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
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
          console.log("SSG_id : ", SSG_id , "SSG_pw : "+ SSG_pw);
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
        console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
      })

  }

  var getproductlist_REST = function(depth1, depth2, depth3, startPage, limitPage, callback) {
    var depth_1, depth_2, depth_3;
    if (depth1 == undefined) {
      depth_1 = '';
    } else {
      depth_1 = depth1;
    }
    if (depth2 == undefined) {
      depth_2 = '';
    } else {
      depth_2 = depth2;
    }
    if (depth3 == undefined) {
      depth_3 = '';
    } else {
      depth_3 = depth3;
    }
    var options_product = {
      depth1: depth_1,
      depth2: depth_2,
      depth3: depth_3,
      startPage: startPage,
      limitPage: limitPage
    }
    request.post({
        url: 'http://localhost:5050/api/category',
        body: options_product,
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );

  }
  var getproductdetail_REST = function(product_id, callback) {
    var options_product = {
      product_id: product_id
    }
    request.post({
        url: 'http://localhost:5050/api/product',
        body: options_product,
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );

  }
  var getSLproduct_REST = function(prd_id,SL_reserved, callback) {
    var prd_id = prd_id;

    request.post({
        url: 'http://localhost:5050/api/product/SL',
        body: {
          prd_url: prd_id,
          SL_reserved : SL_reserved
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }
  var getLTproduct_REST = function(prd_id,LT_reserved, callback) {
    var prd_id = prd_id;

    request.post({
        url: 'http://localhost:5050/api/product/LT',
        body: {
          prd_url: prd_id,
          LT_reserved : LT_reserved
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }
  var getSSGproduct_REST = function(prd_id,SSG_reserved, callback) {
    var prd_id = prd_id;

    request.post({
        url: 'http://localhost:5050/api/product/SSG',
        body: {
          prd_url: prd_id,
          SSG_reserved : SSG_reserved
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }

  var getPostproduct_REST = function(prd_name, callback) {
    var prd_name = prd_name;

    request.post({
        url: 'http://localhost:5050/api/product/post',
        body: {
          prd_name: prd_name
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }


  return {
    getSLreserved: getSLreserved_REST,
    getLTreserved: getLTreserved_REST,
    getSSGreserved: getSSGreserved_REST,
    getproductlist: getproductlist_REST,
    getSLproduct: getSLproduct_REST,
    getLTproduct: getLTproduct_REST,
    getSSGproduct: getSSGproduct_REST,
    getproductdetail: getproductdetail_REST,
    getPostproduct: getPostproduct_REST
  }

})();

module.exports = UTIL;
