var express = require('express');
var router = express.Router();
var moment = require('moment');
var crypto = require("crypto");
var connection = require('../mysqlConnection');
var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

router.get('/', function(req, res, next) {
  //activeフラグ変更
  console.log(req.query);
  var activeHash = req.query.activeHash;
  var activateQuery = 'UPDATE users SET active = "1" where active = "' + activeHash + '"';//where activeHashに書き換え
  //hashが存在するかどうかの確認
  var userExistsQuery = 'SELECT * FROM users WHERE active = "' + activeHash + '" LIMIT 1';

  connection.query(userExistsQuery, function(err, email) {
    var errormsg = email.length === 0;
    if (errormsg) {
      console.log("errormsg=");
      console.log(errormsg);
      res.render('error', {
        errormsg: "仮登録がされていません"
        });
    } else {
      console.log(activateQuery);
      connection.query(activateQuery, function(err, rows) {
        res.render('login', {
          title : 'login'
        });
      });
    }
  });
});

module.exports = router;

