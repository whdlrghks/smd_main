var express = require('express');
var router = express.Router();
var async = require('async');
var getEvent = require('../app_modules/util/getEvent');
var getReserved = require('../app_modules/util/reserve');
var sendrest = require('../app_modules/util/sendrest');
const request = require('request');
var nodemailer = require('nodemailer');
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
          productlist: body
        });
      } else {
        u_name = req.user.Username
        res.render('index', {
          username: u_name,
          productlist: body
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
    sendrest.getReseverdlist(req.user._id, function(result) {
      u_name = req.user.Username;

      res.render('Dutyfree_linkage', {
        username: u_name,
        SL_check: result.sl_check,
        LT_check: result.lt_check,
        SSG_check: result.ssg_check
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
    //가격만 요청하는 거 따로 또 만들rl.
    sendrest.getReseverdlist(req.user._id, function(result) {
      u_name = req.user.Username;
      var sl_check;
      var lt_check;
      var ssg_check;
      if(result.sl_check){
        sl_check = result.sl_check;
      }
      if(result.lt_check){
        lt_check = result.lt_check;
      }
      if(result.ssg_check){
        ssg_check = result.ssg_check;
      }
      res.render('Manage_reserve', {
        username: u_name,
        SL_reserved: sl_check,
        LT_reserved: lt_check,
        SSG_reserved: ssg_check,
        user_id: req.user._id
      })

    })
  } else {
    u_name = '';
    res.redirect('/')
  }
})

router.post('/getreserved', function(req, res) {
  var result_list = [];

  console.log('[SL, LT, SSG] ' + req.user._id + ' REQUEST GET ALL _RESERVED');
  async.parallel([
      function(callback) {
        if (req.body.SL_check) {
          sendrest.getSLreserved(req.user._id, function(results) {
            req.session.sl_reserved = results;
            result_list[0] = results;
            callback(null, "finish");
          })
        } else {
          result_list[0] = "No Auth";
          callback(null, "finish");
        }
      },
      function(callback) {
        if (req.body.LT_check) {
          sendrest.getLTreserved(req.user._id, function(results) {
            req.session.lt_reserved = results;
            result_list[1] = results;
            callback(null, "finish");
          })
        } else {
          result_list[1] = "No Auth";
          callback(null, "finish");
        }
      },
      function(callback) {
        if (req.body.SSG_check) {
          sendrest.getSSGreserved(req.user._id, function(results) {
            req.session.ssg_reserved = results;
            result_list[2] = results;
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
//   console.log('[SL] ' + req.user._id + ' REQUEST GET SL_RESERVED ');
//   sendrest.getSLreserved(req.user._id, function(results){
//     req.session.sl_reserved=results[0];
//     res.json(results);
//   })
// })
//
// router.post('/getLTreserved', function(req, res){
//   console.log('[LT] ' + req.user._id + ' REQUEST GET LT_RESERVED ');
//   sendrest.getLTreserved(req.user._id, function(results){
//     req.session.lt_reserved=results[0];
//     res.json(results);
//   })
// })
// router.post('/getSSGreserved', function(req, res){
//   console.log('[SSG] ' + req.user._id + ' REQUEST GET SSG_RESERVED ');
//   sendrest.getSSGreserved(req.user._id, function(results){
//     req.session.ssg_reserved=results[0];
//     res.json(results);
//   })
// })


router.post('/autocomplete', function(req, res) {
  console.log("[REQUEST AUTO COMPLETE]");
  sendrest.getAutocomplete(function(results) {
    var availableTags = results;
    res.json(availableTags);
  })
})

router.post('/Getreviewlist', function(req, res) {
  console.log("[REQUEST REVIEW LIST]");
  console.log(req.body);
  sendrest.getListreview(req.body.prd_id, req.body.startpage, function(results) {
    console.log("[RESULT REVIEW LIST OK]");
    res.json(results);
  })
})

router.post('/EnrollReview', function(req, res) {
  console.log("[REQUEST REROLL REVIEW]");
  // body: {
  //   prd_id : prd_id,
  //   user_id: user_id,
  //   username : username,
  //   rating : rating,
  //   content : content
  // },
  sendrest.getEnrollreview(req.body.prd_id, req.body.user_id, req.body.username, req.body.rating, req.body.content, function(results) {

    sendrest.getListreview(req.body.prd_id, req.body.startpage, function(results_list) {
      console.log("[LIST RESULTS OK ]");
      res.json(results_list);
    })
  })
})


router.get('/shopping_cart', function(req, res) {

    var u_name;
    if (req.user == undefined) {
      u_name = '';
      res.render('/', {
        username: u_name
      });
    } else {
      u_name = req.user.Username;
      let user_id = req.user._id;
      sendrest.getCartlist(user_id, function(result) {
        // var result = {
        //   product_list : product,
        //   LT_reserved:LT_reserved,
        //   SL_reserved:SL_reserved,
        //   SSG_reserved:SSG_reserved
        // };



        res.render('shopping_cart', {
          username: u_name,
          product_list: result.product_list,
          LT_reserved: result.LT_reserved,
          SL_reserved: result.SL_reserved,
          SSG_reserved: result.SSG_reserved
        });
      })


    }

  }

)

router.post('/reserve/refresh', function(req, res) {
  console.log("[REQUEST RESERVED REFRESH]");
  var user_id = req.user._id;
  sendrest.getReservedRefresh(user_id, function(results) {
    console.log("[FINISH REQUEST RESERVED REFRESH]");
    console.log(results);
    res.json(results)
  })
})

// router.post('/inquiry_board', function(req, res) {
//
//   console.log("[REQUEST RESERVED REFRESH]");
//   var user_id = req.body.user_id;
//   sendrest.getAutocomplete(user_id,function(results){
//     console.log("[FINISH REQUEST RESERVED REFRESH]");
//     res.json(results)
//   })
// })
//
router.get('/inquiry_board', function(req, res) {
  var u_name;
  var page = req.param('page');
   if(page == null) {page = 1;}
   var skipSize = (page-1)*10;
   var limitSize = 10;



  sendrest.getboardlist(skipSize,limitSize, function(result){

    if (req.user == undefined) {
      u_name = '';
      res.render('inquiry_board', {
        username: u_name,
        board : result.content,
        pagination : result.pagination
      });
    } else {
      u_name = req.user.Username;
      res.render('inquiry_board', {
        username: u_name,
        board : result.content,
        pagination : result.pagination
      });
    }
  })
})

router.get('/inquiry_enroll', function(req, res) {
  var u_name;
    if (req.user == undefined) {
      u_name = '';
      res.render('inquiry_write', {
        username: u_name
      });
    } else {
      u_name = req.user.Username;
      res.render('inquiry_write', {
        username: u_name
      });
    }
})
router.post('/inquiry_enroll', function(req, res) {
    var addNewTitle = req.body.title;
    var addNewWriter = req.body.writer;
    var addNewContent = req.body.content;
    var addNewPassword = req.body.password;
    sendrest.enrollboard(addNewTitle, addNewContent, addNewWriter, addNewPassword, function(result){
      res.json(result);
    })
})

router.get('/inquiry_content', function(req, res) {
  var board_id = req.query.id;
  var u_name;
  sendrest.getdetailboard(board_id, function(board){
    if (req.user == undefined) {
      u_name = '';
      res.render('inquiry_content', {
        username: u_name,
        content : board
      });
    } else {
      u_name = req.user.Username;
      res.render('inquiry_content', {
        username: u_name,
        content : board
      });
    }
  })

})

router.post('/inquiry_enroll_comment', function(req, res) {
    var board_id = req.body.board_id;
    var addNewWriter = req.body.writer;
    var addNewComment = req.body.comment;
    console.log("INQUIRY_ENROLL COMMENT");
    sendrest.enrollcomment(board_id, addNewWriter,addNewComment, function(result){
      res.json(result);
    })
})


router.post('/sendEmail', function(req, res) {

  console.log("[SENDEMAIL]");


  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'smdManager123@gmail.com',
      pass: 'tpauseo123'
    }
  });

  var mailOption = {
    from: req.body.inquiry_email,
    to: 'smdManager123@gmail.com',
    subject: req.body.inquiry_Title,
    text: req.body.inquiry_email +"\n email from \n" + req.body.inquiry_Content
  };

  transporter.sendMail(mailOption, function(err, info) {
    if (err) {
      console.error('Send Mail error : ', err);
    } else {
      console.log('Message sent : ', info);
      var u_name;
      if (req.user == undefined) {
        u_name = '';
        res.render('inquiry_page', {
          username: u_name
        });
      } else {
        u_name = req.user.Username;
        res.render('inquiry_page', {
          username: u_name
        });
      }
    }
  });

})

module.exports = router;
