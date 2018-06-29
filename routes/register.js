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



router.get('/', function(req, res, next) {
  //メール送信コマンド
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
    // emailのハッシュ化によるtoken作成
    const shaSum = crypto.createHash('sha256');
    shaSum.update(email);
    let emailHash = shaSum.digest('hex');
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var emailExistsQuery = 'SELECT * FROM users WHERE email = "' + email + '" LIMIT 1'; // 追加
    var registerQuery = 'INSERT INTO users (user_name, email, password, created_at, active) VALUES ("' + userName + '", ' + '"' + email + '", ' + '"' + hash + '", ' + '"' + createdAt + '", ' + '"' + emailHash + '")'; // emailHash追加
    var mailOptions = {
    from    : 'info@arteryex.biz', // 送信元アドレス
    to      : req.body.email, // 送信するアドレス
    subject : 'Welcome to Arteryex ICO', // タイトル
    text    : 'This is pre-Registration.\nPlease complete Registration via URL below\nhttps://www.arteryex.com/activate?activeHash='+ emailHash +''
    };
    connection.query(emailExistsQuery, function(err, email) {
      var errormsg = email.length === 1;
      if (errormsg) {
        res.render('register', {
          title: 'Register',
          errormsg: 'This email is already used.'
        });
      } else if (password != repassword) {
        var diffpass = 1;
        res.render('register', {
          title: 'Register',
          errormsg: 'Password you typed is incorrect.'
        });
      }else {
        connection.query(registerQuery, function(err, rows) {
          transporter.sendMail( mailOptions, function( error, info ){
          if( error ){
            return console.log( error );
          }
          console.log('Message sent: ' + info.response);
        });
          console.log(registerQuery);

          res.render('login', {
            preregisted: 'We emailed you a URL.\nPlease complete registration via URL.'
          });
        });
      }
    });
  });

module.exports = router;
