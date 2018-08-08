var async = require('async'),
express = require('express');
var router = express.Router();
const request = require('request');
var sendrest=require('../app_modules/util/sendrest');
/* GET 첫번째 페이지. */
router.get('/', function(req, res) {
  var u_name;
  console.log("req.user is "+req.user);
  console.log(req.query);
  var depth1 = req.query.depth1;
  var depth2 = req.query.depth2;
  var depth3 = req.query.depth3;
  if(req.query.startpage==undefined){
      var start = 0;
  }
  else {
    var start = req.query.startpage;
  }
  var limit =16;
  sendrest.getproductlist(depth1,depth2,depth3, start, limit, function(productlist){

    if (req.user == undefined) {
      u_name = '';
      res.render('shop_grid_full_width', {
        username: u_name,
        totalcount : productlist[0],
        productlist : productlist[1],
        startpage : productlist[2],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    } else {
      u_name = req.user.Username
      res.render('shop_grid_full_width', {
        username: u_name,
        totalcount : productlist[0],
        productlist : productlist[1],
        startpage : productlist[2],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    }
  })
});

router.get('/single/', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is "+req.user);

  var product_id = req.query.id;
  var depth1 = req.query.depth1;
  var depth2 = req.query.depth2;
  var depth3 = req.query.depth3;

  sendrest.getproductdetail(product_id, function(productlist){
      console.log(productlist);
    if (req.user == undefined) {
      u_name = '';

      res.render('single_product', {
        username: u_name,
        product : productlist[0][0],
        // SL_price : productlist[1][0].split("/")[0],
        // LT_price : productlist[2][0].split("/")[0],
        // SSG_price : productlist[3][0].split("/")[0],
        // SL_storage : productlist[1][0].split("/")[1],
        // LT_storage : productlist[2][0].split("/")[1],
        // SSG_storage : productlist[3][0].split("/")[1],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    } else {
      u_name = req.user.Username
      res.render('single_product', {
        username: u_name,
        product : productlist[0][0],
        // SL_price : productlist[1][0].split("/")[0],
        // LT_price : productlist[2][0].split("/")[0],
        // SSG_price : productlist[3][0].split("/")[0],
        // SL_storage : productlist[1][0].split("/")[1],
        // LT_storage : productlist[2][0].split("/")[1],
        // SSG_storage : productlist[3][0].split("/")[1],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    }
  })
  router.post('/single/getinfo', function(req, res){
    var result = [];
    console.log(req.body);
    async.parallel([
        function(callback) {
          var prd_sl_url = req.body.SL_URL;
          sendrest.getSLproduct(prd_sl_url, function(sl_info){
            console.log(sl_info);
            result[0]=sl_info;
            callback(null,null);
          })
        },
        function(callback) {
          var prd_lt_url = req.body.LT_URL;
          sendrest.getLTproduct(prd_lt_url, function(lt_info){
            console.log(lt_info);
            result[1]=lt_info;
            callback(null,null);
          })
        },
        function(callback) {
          var prd_ssg_url = req.body.SSG_URL;
          sendrest.getSSGproduct(prd_ssg_url, function(ssg_info){
            console.log(ssg_info);
            result[2]=ssg_info;
            callback(null,null);
          })
        }
      ],
      function(err, results) {
        if(err){
          console.log(err);
        }
        else{
          res.json(result);
        }
      })
  })

  router.post('/single/SL', function(req, res) {
    console.log("req.user is "+req.user);
    var prd_url = req.body.SL_URL;
    sendrest.getSLproduct(prd_url, function(sl_info){
      console.log(sl_info);
      res.json(sl_info);
    })
  });
  router.post('/single/LT', function(req, res) {
    console.log("req.user is "+req.user);
    var prd_url = req.body.LT_URL;
    sendrest.getLTproduct(prd_url, function(lt_info){
      console.log(lt_info);
      res.json(lt_info);
    })
  });
  router.post('/single/SSG', function(req, res) {
    console.log("req.user is "+req.user);
    var prd_url = req.body.SSG_URL;
    sendrest.getSSGproduct(prd_url, function(ssg_info){
      console.log(ssg_info);
      res.json(ssg_info);
    })
  });


});


module.exports = router;
