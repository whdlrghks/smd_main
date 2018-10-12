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
    request.post({
        url: 'http://localhost:5050/api/getslreserved',
        body: {user_id : user_id},
        json: true
      },
      function(error, response, body) {
        if(error){
          console.log("[ERROR ABOUT SL RESERVED_REST ]",error);
        }
        callback(body);
      }
    );


    // knex.select().from('user_info').where('User_info_id', user_id)
    //   .then(function(results) {
    //     if (results[0] == undefined) {
    //       callback("no result")
    //     } else {
    //       var SL_id = results[0].Shilla_id,
    //         SL_pw = results[0].Shilla_pw;
    //       console.log("SL_ID : ", SL_id , "SL_PW : "+ SL_pw);
    //       var options_sl = {
    //         mode: 'text',
    //         pythonPath: '',
    //         pythonOptions: ['-u'],
    //         scriptPath: '',
    //         args: [SL_id, SL_pw]
    //       }
    //       var body = {
    //         user_id : user_id,
    //         options : options_sl
    //       }
    //       request.post({
    //           url: 'http://localhost:5050/api/getslreserved',
    //           body: body,
    //           json: true
    //         },
    //         function(error, response, body) {
    //           callback(body);
    //         }
    //       );
    //     }
    //   })
    //   .catch(function(err) {
    //     console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
    //   })

  }


  var getLTreserved_REST = function(user_id, callback) {
    var user_id = user_id;
    request.post({
        url: 'http://localhost:5050/api/getltreserved',
        body: {user_id : user_id},
        json: true
      },
      function(error, response, body) {
        if(error){
          console.log("[ERROR ABOUT LT RESERVED_REST ]",error);
        }
        callback(body);
      }
    );
    // knex.select().from('user_info').where('User_info_id', user_id)
    //   .then(function(results) {
    //     if (results[0] == undefined) {
    //       callback("no result")
    //     } else {
    //       var LT_id = results[0].Lotte_id,
    //         LT_pw = results[0].Lotte_pw;
    //       console.log("LT_id : ", LT_id , "LT_pw : "+ LT_pw);
    //       var options_lt = {
    //         mode: 'text',
    //         pythonPath: '',
    //         pythonOptions: ['-u'],
    //         scriptPath: '',
    //         args: [LT_id, LT_pw]
    //       }
    //       var body = {
    //         user_id : user_id,
    //         options : options_lt
    //       }
    //       request.post({
    //           url: 'http://localhost:5050/api/getltreserved',
    //           body: body,
    //           json: true
    //         },
    //         function(error, response, body) {
    //           callback(body);
    //         }
    //       );
    //     }
    //   })
    //   .catch(function(err) {
    //     console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
    //   })

  }

  var getSSGreserved_REST = function(user_id, callback) {
    var user_id = user_id;

    request.post({
        url: 'http://localhost:5050/api/getssgreserved',
        body: {user_id : user_id},
        json: true
      },
      function(error, response, body) {
        if(error){
          console.log("[ERROR ABOUT SSG RESERVED_REST ]",error);
        }
        callback(body);
      }
    );
    // knex.select().from('user_info').where('User_info_id', user_id)
    //   .then(function(results) {
    //     if (results[0] == undefined) {
    //       callback("no result")
    //     } else {
    //       var SSG_id = results[0].Shinsegae_id,
    //         SSG_pw = results[0].Shinsegae_pw;
    //       console.log("SSG_id : ", SSG_id , "SSG_pw : "+ SSG_pw);
    //       var options_ssg = {
    //         mode: 'text',
    //         pythonPath: '',
    //         pythonOptions: ['-u'],
    //         scriptPath: '',
    //         args: [SSG_id, SSG_pw]
    //       }
    //       var body = {
    //         user_id : user_id,
    //         options : options_ssg
    //       }
    //       request.post({
    //           url: 'http://localhost:5050/api/getssgreserved',
    //           body: body,
    //           json: true
    //         },
    //         function(error, response, body) {
    //           callback(body);
    //         }
    //       );
    //     }
    //   })
    //   .catch(function(err) {
    //     console.log("[GETSLRESERVED_REST] 'S ERROR" + err);
    //   })

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
  var getproductdetail_REST = function(product_id, user_id, callback) {

    var options_product = {
      product_id: product_id,
      user_id : user_id
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

  var getAutocomplete_REST = function(callback) {
    request.get({
        url: 'http://localhost:5050/api/autocomplete',
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );
  }

  var getSearch_REST = function(category, searchbox, startPage, limitPage, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/search',
        body: {
          category: category,
          searchbox: searchbox,
          startPage: startPage,
          limitPage: limitPage
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }

  var getReseverdlist_REST = function(user_id,callback) {
    request.post({
        url: 'http://localhost:5050/api/check_duty',
        body: {
          user_id: user_id
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }

  var getlogin_REST = function(user_id,callback) {

    request.post({
        url: 'http://localhost:5050/api/login_user',
        body: {
          user_id: user_id
        },
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );
  }
  var getReservedRefresh_REST = function(user_id,callback) {
    request.post({
        url: 'http://localhost:5050/api/refresh',
        body: {
          user_id: user_id
        },
        json: true
      },
      function(error, response, body) {
        callback(body);
      }
    );
  }
  var getEnrollreview_REST = function(prd_id, user_id, username, rating, content, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/review/enroll',
        body: {
          prd_id : prd_id,
          user_id: user_id,
          username : username,
          rating : rating,
          content : content
        },
        json: true
      },
      function(error, response, body) {
        // success
        callback(body);
      }
    );
  }

  var getListreview_REST = function(prd_id, startPage, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/review/list',
        body: {
          prd_id : prd_id,
          startPage : startPage
        },
        json: true
      },
      function(error, response, body) {
        // return type is JSON
        // var body = {
        //   totalcount : count,
        //   present_point : startPage,
        //   list : review
        // };
        callback(body);
      }
    );
  }

  var addCart_REST = function(prd_id, user_id, duty_category, img_url, storage, price, percent, prd_url, prd_name, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/addCart',
        body: {
          prd_id : prd_id,
          user_id : user_id,
          storage : storage,
          duty_category : duty_category,
          price : price,
          percent : percent,
          prd_url : prd_url,
          img_url : img_url,
          prd_name : prd_name
        },
        json: true
      },
      function(error, response, body) {
        // return type is JSON
        // result == success or fail

        callback(body);
      }
    );
  }

  var getCartlist_REST = function(user_id, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/getCartlist',
        body: {
          user_id : user_id
        },
        json: true
      },
      function(error, response, body) {
        // return type is JSON
        // var result = {
        //   product_list : product,
        //   LT_reserved:LT_reserved,
        //   SL_reserved:SL_reserved,
        //   SSG_reserved:SSG_reserved
        // };

        callback(body);
      }
    );
  }
  var deleteCart_REST = function(_id, callback) {
    request.post({
        url: 'http://localhost:5050/api/product/deleteCart',
        body: {
          _id : _id
        },
        json: true
      },
      function(error, response, body) {
        // return type is JSON
        // result == success or fail

        callback(body);
      }
    );
  }

  var getboardlist_REST = function(skipSize,limitSize, callback) {
    var data = {
      skipSize: skipSize,
      limitSize : limitSize
    }
    request.post({
        url: 'http://localhost:5050/api/getboardlist',
        body : data,
        json: true
      },
      function(error, response, body) {
        // return type is JSON
        // result == success or fail

        callback(body);
      }
    );
  }

  var enrollboard_REST = function(title, content, writer, password, callback) {
    var data = {
      addContentSubject : title,
      addContentWriter : writer,
      addContents : content,
      addContentPassword : password
    }
    request.post({
        url: 'http://localhost:5050/api/enrollboardlist',
        body : data,
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );
  }

  var getdetailboard_REST = function(id, callback) {
    var data = {
      board_id : id
    }
    request.post({
        url: 'http://localhost:5050/api/getboardcontent',
        body : data,
        json: true
      },
      function(error, response, body) {

        callback(body);
      }
    );
  }

  var enrollcomment_REST = function(id, writer, comment, callback) {
    var data = {
      board_id : id,
      writer : writer,
      comment : comment
    }
    request.post({
        url: 'http://localhost:5050/api/addboardcomment',
        body : data,
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
    getPostproduct: getPostproduct_REST,
    getAutocomplete: getAutocomplete_REST,
    getSearch: getSearch_REST,
    getReseverdlist : getReseverdlist_REST,
    getlogin : getlogin_REST,
    getEnrollreview : getEnrollreview_REST,
    getListreview : getListreview_REST,
    addCart : addCart_REST,
    getCartlist : getCartlist_REST,
    deleteCart : deleteCart_REST,
    getReservedRefresh : getReservedRefresh_REST,
    getboardlist : getboardlist_REST,
    enrollboard : enrollboard_REST,
    getdetailboard : getdetailboard_REST,
    enrollcomment : enrollcomment_REST
  }

})();

module.exports = UTIL;
