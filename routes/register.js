var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var connection = require('../mysqlConnection');
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport( smtpTransport({
    host : 'arteryex.sakura.ne.jp',
    port : 587,
    auth : {
        user : 'info@arteryex.biz', // メールアドレス
        pass : 'arteryex2018' // メールアドレスパスワード
    }
}));

var mailOptions = {
    from    : 'info@arteryex.biz', // 送信元アドレス
    to      : 'xxxx@bbbbbb', // 送信するアドレス
    subject : 'KMH', // タイトル
    text    : '今日はマッサージの日！'
};

router.get('/', function(req, res, next) {
  //メール送信コマンド
  transporter.sendMail( mailOptions, function( error, info ){
    if( error ){
        return console.log( error );
    }
    console.log('Message sent: ' + info.response);
});

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