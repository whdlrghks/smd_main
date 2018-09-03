var async = require('async'),
  express = require('express');
var router = express.Router();
const request = require('request');
var sendrest = require('../app_modules/util/sendrest');
/* GET 첫번째 페이지. */
router.get('/', function(req, res) {
  var u_name;
  console.log("req.user is " + req.user);
  console.log(req.query);
  var depth1 = req.query.depth1;
  var depth2 = req.query.depth2;
  var depth3 = req.query.depth3;
  if (req.query.startpage == undefined) {
    var start = 0;
  } else {
    var start = req.query.startpage;
  }
  var limit = 16;
  sendrest.getproductlist(depth1, depth2, depth3, start, limit, function(productlist) {
    console.log("totalcount : ", productlist[0]);
    console.log("startpage : ", productlist[2]);
    if (req.user == undefined) {
      u_name = '';
      res.render('shop_grid_full_width', {
        username: u_name,
        totalcount: productlist[0],
        productlist: productlist[1],
        startpage: productlist[2],
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    } else {
      u_name = req.user.Username
      res.render('shop_grid_full_width', {
        username: u_name,
        totalcount: productlist[0],
        productlist: productlist[1],
        startpage: productlist[2],
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    }
  })
});

router.get('/single/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is " + req.user);
  console.log(req.session);

  var product_id = req.query.id;
  var depth1 = req.query.depth1;
  var depth2 = req.query.depth2;
  var depth3 = req.query.depth3;

  sendrest.getproductdetail(product_id, function(productlist) {
    console.log(productlist);
    console.log(req.user);
    if (req.user == undefined) {
      u_name = '';

      res.render('single_product', {
        username: u_name,
        product: productlist[0][0],
        SL_reserved: '0',
        LT_reserved: '0',
        SSG_reserved: '0',
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    } else {
      u_name = req.user.Username
      res.render('single_product', {
        username: u_name,
        product: productlist[0][0],
        SL_reserved: req.session.sl_reserved,
        LT_reserved: req.session.lt_reserved,
        SSG_reserved: req.session.ssg_reserved,
        depth1: depth1,
        depth2: depth2,
        depth3: depth3
      });
    }
  })

});

router.post('/single/getinfo', function(req, res) {
  var result = [];
  console.log(req.body);
  async.parallel([
      function(callback) {
        if (req.body.SL_URL!="42") {
          var prd_sl_url = req.body.SL_URL;
          sendrest.getSLproduct(prd_sl_url, req.body.SL_reserved, function(sl_info) {
            console.log(sl_info);
            result[0] = sl_info;
            callback(null, null);
          })
        } else {
          console.log("[NO SL_URL]");
          result[0] = "";
          callback(null, null);
        }

      },
      function(callback) {
        if (req.body.LT_URL!="42") {
          var prd_lt_url = req.body.LT_URL;
          sendrest.getLTproduct(prd_lt_url, req.body.LT_reserved, function(lt_info) {
            console.log(lt_info);
            result[1] = lt_info;
            callback(null, null);
          })
        } else {
          console.log("[NO LT_URL]");
          result[1] = "";
          callback(null, null);
        }

      },
      function(callback) {
        if (req.body.SSG_URL!="42") {
          var prd_ssg_url = req.body.SSG_URL;
          sendrest.getSSGproduct(prd_ssg_url, req.body.SSG_reserved, function(ssg_info) {
            console.log(ssg_info);
            result[2] = ssg_info;
            callback(null, null);
          })
        } else {
          console.log("[NO SSG_URL]");
          result[2] = "";
          callback(null, null);
        }

      },
      function(callback) {
        var prd_name = req.body.prd_name;
        //브랜드+상품이름 같이 검색
        sendrest.getPostproduct(prd_name, function(post_info) {
          console.log(post_info);
          result[3] = post_info;
          callback(null, null);
        })
      }
    ],
    function(err, results) {
      if (err) {
        console.log(err);
      } else {
        res.json(result);
      }
    })
})


// 개별 요청
// router.post('/single/SL', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.SL_URL;
//   sendrest.getSLproduct(prd_url, function(sl_info){
//     console.log(sl_info);
//     res.json(sl_info);
//   })
// });
// router.post('/single/LT', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.LT_URL;
//   sendrest.getLTproduct(prd_url, function(lt_info){
//     console.log(lt_info);
//     res.json(lt_info);
//   })
// });
// router.post('/single/SSG', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.SSG_URL;
//   sendrest.getSSGproduct(prd_url, function(ssg_info){
//     console.log(ssg_info);
//     res.json(ssg_info);
//   })
// });
// router.post('/single/post', function(req, res) {
//   console.log("req.user is "+req.user);
//   var prd_url = req.body.prd_name;
//   sendrest.getPostproduct(prd_name, function(post_info){
//     console.log(post_info);
//     // res.json(post_info);
//   })
// });


router.get('/search/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is " + req.user);
  console.log("[SEARCH] SEARCH API IS REQUESTED ABOUT",req.query.searchbox);
  var depth1 = '';
  var depth2 = '';
  var depth3 = '';
  if (req.query.startpage == undefined) {
    var start = 0;
  } else {
    var start = req.query.startpage;
  }
  var limit = 16;
  sendrest.getSearch(req.query.searchcategory, req.query.searchbox, start, limit, function(productlist) {
    console.log("totalcount : ", productlist[0]);
    console.log("startpage : ", productlist[2]);
    if (req.user == undefined) {
      u_name = '';
      if(productlist=="no result"){
        res.render('index', {
          username: u_name
        });
      }
      else{
        res.render('shop_grid_full_width', {
          username: u_name,
          totalcount: productlist[0],
          productlist: productlist[1],
          startpage: productlist[2],
          depth1: depth1,
          depth2: depth2,
          depth3: depth3
        });
      }
    } else {
      u_name = req.user.Username
      if(productlist=="no result"){
        res.render('index', {
          username: u_name
        });
      }
      else{
        res.render('shop_grid_full_width', {
          username: u_name,
          totalcount: productlist[0],
          productlist: productlist[1],
          startpage: productlist[2],
          depth1: depth1,
          depth2: depth2,
          depth3: depth3
        });
      }

    }
  })
  //
  // sendrest.getproductdetail(product_id, function(productlist) {
  //   console.log(productlist);
  //   console.log(req.user);
  //   if (req.user == undefined) {
  //     u_name = '';
  //
  //   } else {
  //     u_name = req.user.Username
  //
  //   }
  // })

});


module.exports = router;
