var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/', function(req, res, next) {
    var userName = req.body.user_name;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword;
    //passwordハッシュ化
    const shasum = crypto.createHash('sha256');
    shasum.update(password);
    let hash = shasum.digest('hex');

    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
    var registerQuery = 'INSERT INTO users (user_name, email, password, created_at) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + hash + '", ' + '"' + createdAt + '")'; // 変更
    connection.query(emailExistsQuery, function(err, email) {
      var errormsg = email.length === 1;
      if (errormsg) {
        res.render('register', {
          title: 'Register',
          errormsg: '既に登録されているメールアドレスです'
        });
      } else if (password != repassword) {
        var diffpass = 1;
        res.render('register', {
          title: 'Register',
          errormsg: '入力しているパスワードが異なります'
        });
      }else {
        connection.query(registerQuery, function(err, rows) {
          console.log(registerQuery);
          res.redirect('/login');
        });
      }
    });
  });

module.exports = router;