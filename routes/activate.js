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
  userID = req.query.userID;
  var activateQuery = 'UPDATE users SET active = 1 where user_id = ' + userID + ';'
  connection.query(activateQuery, function(err, rows) {
    console.log(err);
  });
  res.render('login', {
    title: "login"
  });
});

module.exports = router;

