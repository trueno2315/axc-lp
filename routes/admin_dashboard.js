var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
var fs = require('fs');
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

router.get('/:aiu', function(req, res, next){
    var unVerifiedListQuery = "SELECT user_id, email, firstname, lastname, id_image FROM users WHERE kyc=1";
    connection.query(unVerifiedListQuery, function(err, unVerifiedLists){
      if(!err){
        res.render('admin_dashboard', {
          unVerifiedLists: unVerifiedLists
        });
      } else {
        console.log(err);
        res.render('admin_dashboard',{
          title:'admin_dashboard',
          result:"DBから未承認リストの取得に失敗"
        });
      }
    });
});

router.post('/', function(req, res, next) {
    var userId = req.body.id;
  //否認ボタンが押された場合の処理ーーーーーーーーーーーーーーーーーーーー
    if(req.body.deny === "deny"){
        var mailOptions = {
          from    : 'info@arteryex.biz',
          to      : req.body.email,
          subject : 'Arteryex ICO',
          text    : 'Your Identification is denied. Please retry.'
        };
        transporter.sendMail( mailOptions, function( error, info ){
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });
        res.redirect('admin_dashboard/aiu');
        console.log('STATUS::: UserID:'+ userId +' を否認しました.');
　//認証ボタンが押された場合の処理ーーーーーーーーーーーーーーーーーーーーーー
    } else {
      var kycUpdateQuery = 'UPDATE users SET kyc = "2" where user_id = "' + userId + '"'
      connection.query(kycUpdateQuery, function(err, rows) {
          if(err) {
              res.render('admin_dashboard/aiu');
              console.log("STATUS:: 承認失敗 ERROR ERROR");
          } else {
              res.redirect('admin_dashboard/aiu');
              console.log("STATUS:: KYC承認完了")
          }
      });
    }
  });

module.exports = router;