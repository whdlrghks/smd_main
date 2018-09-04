var express = require('express');
var router = express.Router();
var async = require('async');
var getEvent = require('../app_modules/util/getEvent');
var getReserved = require('../app_modules/util/reserve');
var sendrest = require('../app_modules/util/sendrest');
const request = require('request');
/* GET home page. */
router.get('/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is " + req.user);
  request.post({
      url: 'http://localhost:5050/api/index',
      json: true
    },
    function(error, response, body) {
      console.log(body);
      if (req.user == undefined) {
        u_name = '';
        res.render('index', {
          username: u_name,
          productlist : body
        });
      } else {
        u_name = req.user.Username
        res.render('index', {
          username: u_name,
          productlist : body
        });
      }
    }
  );



});

//신라 이벤트 페이지
router.get('/reserve_shilla', function(req, res) {
  //신라 이벤트 페이지 csv로 받아오기
  console.log("GET IN RESERVE _ SHILLA");
  getEvent("shillaPoint", function(eventlist_sl) {
    var u_name;
    if (req.user == undefined) {
      u_name = '';
      res.render('reserve_shilla', {
        username: u_name,
        eventlist: eventlist_sl
      });
    } else {
      u_name = req.user.Username
      res.render('reserve_shilla', {
        username: u_name,
        eventlist: eventlist_sl
      });
    }
  });
  //로그인 되어있는지 안되어있는지 구분하기 위한 값

});
//lotte event page
router.get('/reserve_lotte', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  getEvent("lottePoint", function(eventlist_sl) {
    var u_name;
    if (req.user == undefined) {
      u_name = '';
      res.render('reserve_lotte', {
        username: u_name,
        eventlist: eventlist_sl
      });
    } else {
      u_name = req.user.Username;
      res.render('reserve_lotte', {
        username: u_name,
        eventlist: eventlist_sl
      });
    }
  });

});

//ssg event page
router.get('/reserve_shinsegae', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  getEvent("ssgPoint", function(eventlist_sl) {
    var u_name;
    if (req.user == undefined) {
      u_name = '';
      res.render('reserve_shinsegae', {
        username: u_name,
        eventlist: eventlist_sl
      });
    } else {
      u_name = req.user.Username;
      res.render('reserve_shinsegae', {
        username: u_name,
        eventlist: eventlist_sl
      });
    }
  });

});
router.get('/Dutyfree_linkage', function(req, res) {
  var u_name;
  if (req.user != undefined) {
    getReserved(req, res, function(list) {
      u_name = req.user.Username;
      res.render('Dutyfree_linkage', {
        username: u_name,
        SL_check: list[0],
        LT_check: list[1],
        SSG_check: list[2]
      })

    })
  } else {
    u_name = '';
    res.redirect('/')
  }

});

router.get('/Manage_reserve', function(req, res) {
  var u_name;
  if (req.user != undefined) {
    getReserved(req, res, function(list) {
      u_name = req.user.Username;
      res.render('Manage_reserve', {
        username: u_name,
        lt_reserved: list[0],
        SL_reserved: list[1],
        SSG_reserved: list[2],
        user_id: req.user.User_id
      })

    })
  } else {
    u_name = '';
    res.redirect('/')
  }
})

router.post('/getreserved', function(req, res) {
  var result_list = [];
  console.log('[SL, LT, SSG] ' + req.user.User_id + 'REQUEST GET ALL _RESERVED');
  async.parallel([
      function(callback) {
        if (req.body.SL_check) {
          sendrest.getSLreserved(req.user.User_id, function(results) {
            req.session.sl_reserved = results[0];
            result_list[0] = results[0];
            callback(null, "finish");
          })
        } else {
          result_list[0] = "No Auth";
          callback(null, "finish");
        }
      },
      function(callback) {
        if (req.body.LT_check) {
          sendrest.getLTreserved(req.user.User_id, function(results) {
            req.session.lt_reserved = results[0];
            result_list[1] = results[0];
            callback(null, "finish");
          })
        } else {
          result_list[1] = "No Auth";
          callback(null, "finish");
        }
      },
      function(callback) {
        if (req.body.SSG_check) {
          sendrest.getSSGreserved(req.user.User_id, function(results) {
            req.session.ssg_reserved = results[0];
            result_list[2] = results[0];
            callback(null, "finish");
          })
        } else {
          result_list[2] = "No Auth";
          callback(null, "finish");
        }
      }
    ],
    function(err, finish) {
      if (err) console.log(err);
      res.json(result_list);
    }
  )
})
// 개별로 적립금 금액 가져오기
// router.post('/getSLreserved', function(req, res){
//
//   console.log('[SL] ' + req.user.User_id + ' REQUEST GET SL_RESERVED ');
//   sendrest.getSLreserved(req.user.User_id, function(results){
//     req.session.sl_reserved=results[0];
//     res.json(results);
//   })
// })
//
// router.post('/getLTreserved', function(req, res){
//   console.log('[LT] ' + req.user.User_id + ' REQUEST GET LT_RESERVED ');
//   sendrest.getLTreserved(req.user.User_id, function(results){
//     req.session.lt_reserved=results[0];
//     res.json(results);
//   })
// })
// router.post('/getSSGreserved', function(req, res){
//   console.log('[SSG] ' + req.user.User_id + ' REQUEST GET SSG_RESERVED ');
//   sendrest.getSSGreserved(req.user.User_id, function(results){
//     req.session.ssg_reserved=results[0];
//     res.json(results);
//   })
// })


router.post('/autocomplete', function(req, res) {
  console.log("[REQUEST AUTO COMPLETE]");
  sendrest.getAutocomplete(function(results){
    var availableTags=results;
    res.json(availableTags);
  })
})

router.get('/shopping_cart', function(req, res) {
  var u_name;
  if (req.user == undefined) {
    u_name = '';
    res.render('shopping_cart', {
      username: u_name
    });
  } else {
    u_name = req.user.Username
    res.render('shopping_cart', {
      username: u_name
    });
  }

})

module.exports = router;
