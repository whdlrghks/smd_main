var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/lotte', function(req, res) {
  res.render('popup_lotte', {
    errormsg: ""
  });
});

router.get('/shilla', function(req, res) {
  res.render('popup_shilla', {
    errormsg: ""
  });
});

router.get('/shinsegae', function(req, res) {
  res.render('popup_shinsegae', {
    errormsg: ""
  });
});
router.get('/lotte_error', function(req, res) {
  res.render('popup_lotte', {
    errormsg: "아이디 혹은 비밀번호가 다릅니다! 다시 입력하여주세요"
  });
});

router.get('/shilla_error', function(req, res) {
  res.render('popup_shilla', {
    errormsg: "아이디 혹은 비밀번호가 다릅니다! 다시 입력하여주세요"
  });
});

router.get('/shinsegae_error', function(req, res) {
  res.render('popup_shinsegae', {
    errormsg: "아이디 혹은 비밀번호가 다릅니다! 다시 입력하여주세요"
  });
});
router.get('/success', function(req, res) {
  res.render('popup_success');
});
router.get('/id_check', function(req, res) {
  res.render('popup_id_check', {
    errormsg: ""
  });
});
router.get('/id_check_error', function(req, res) {
  res.render('popup_id_check', {
    errormsg: "중복된 아이디가 있습니다."
  });
});

module.exports = router;
