var express = require('express');
var router = express.Router();
const request = require('request');
/* GET home page. */
router.get('/category', function(req, res) {
  //로그인 되어있는지 안되어있는지 구분하기 위한 값
  var u_name;
  console.log("req.user is "+req.user);
  if (req.user == undefined) {
    u_name = '';
    res.render('index', {
      username: u_name
    });
  } else {
    u_name = req.user.Username
    res.render('index', {
      username: u_name
    });
  }

});


module.exports = router;
