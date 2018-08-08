var express = require('express');
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
      console.log(productlist[3][0].split("/")[1]);
    if (req.user == undefined) {
      u_name = '';

      res.render('single_product', {
        username: u_name,
        product : productlist[0][0],
        SL_price : productlist[1][0].split("/")[0],
        LT_price : productlist[2][0].split("/")[0],
        SSG_price : productlist[3][0].split("/")[0],
        SL_storage : productlist[1][0].split("/")[1],
        LT_storage : productlist[2][0].split("/")[1],
        SSG_storage : productlist[3][0].split("/")[1],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    } else {
      u_name = req.user.Username
      res.render('single_product', {
        username: u_name,
        product : productlist[0][0],
        SL_price : productlist[1][0].split("/")[0],
        LT_price : productlist[2][0].split("/")[0],
        SSG_price : productlist[3][0].split("/")[0],
        SL_storage : productlist[1][0].split("/")[1],
        LT_storage : productlist[2][0].split("/")[1],
        SSG_storage : productlist[3][0].split("/")[1],
        depth1 : depth1,
        depth2 : depth2,
        depth3 : depth3
      });
    }
  })



});


module.exports = router;
