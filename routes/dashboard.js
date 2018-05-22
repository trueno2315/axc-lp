var express = require('express');
var router = express.Router();
var moment = require('moment'); 
var connection = require('../mysqlConnection');

  router.get('/', function(req, res, next) {
    if (req.session.user_id) {
      var userId=req.session.user_id;
      var query='SELECT user_name from users where user_id = "' + userId + '" ';
      connection.query(query, function(err, user_name) {
        //sessionにユーザーIDが残っていればdashboardへ飛ぶ
          res.render('dashboard', {
            title: 'dashboard',
            userName: user_name
          });
        });
    } else {
      res.render('login', {
        title: 'AXC ICO Login'
      });
    }
  });

  //walletの登録
  router.post('/', function(req, res, next) {
    var updatewallet = req.body.wallet;
    var userId = req.session.user_id;
    var updateQuery  = 'UPDATE users SET wallet = "' + updatewallet + '" where user_id = ' + userId + '';
    connection.query(updateQuery, function(err, rows) {
      console.log(updateQuery);
        res.redirect('/dashboard');
    });
  });

module.exports = router;