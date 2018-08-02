var express = require('express');
var router = express.Router();

/* GET users listing. */
//users.js

router.get('/login', function(req, res) {
  var u_name;
  if (req.user == undefined) {
    u_name = '';
    res.render('login', {
      username: u_name,
      errormsg: ''
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }
});


//ajax로 바꾸기
router.get('/login_error', function(req, res) {
  var u_name;
  if (req.user == undefined) {
    u_name = '';
    res.render('login', {
      username: u_name,
      errormsg: '아이디와 비밀번호를 확인하세요'
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }
});

router.get('/register', function(req, res) {
  var u_name;
  if (req.user == undefined) {
    u_name = '';
    res.render('register', {
      username: u_name,
      username_check: ''
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }

});

router.get('/register_checked', function(req, res) {
  var u_name;
  if (req.user == undefined) {
    u_name = '';
    res.render('register', {
      username: u_name,
      username_check: req.session.username
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }

});

router.get('/password_input', function(req, res) {
  var u_name;
  if (req.user != undefined) {
    u_name = '';
    res.render('password_input', {
      username: u_name,
      errormsg: ''
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }

});


//ajax로 바꾸기
router.get('/password_input_error', function(req, res) {
  var u_name;
  if (req.user != undefined) {
    u_name = '';
    res.render('password_input', {
      username: u_name,
      errormsg: '아이디와 비밀번호를 확인하세요'
    });
  } else {
    u_name = req.user.Username
    res.render('/', {
      username: u_name
    });
  }

});


router.get('/mypage', function(req, res) {
  console.log(req.session);
  console.log(req.isAuthenticated());
  if (req.user && req.user.Username) {
    res.render('mypage', {
      username: req.user.Username,
      Email: req.user.Email
    });

  } else res.render('index', {
    username: ''
  });
});






router.get('/User_info_modify', function(req, res) {
  var u_name;
  if (req.user != undefined) {
    u_name = '';
    res.render('User_info_modify', {
      username: u_name
    });
  } else {
    u_name = req.user.Username
    res.render('User_info_modify', {
      username: u_name
    });
  }

});


module.exports = router;
