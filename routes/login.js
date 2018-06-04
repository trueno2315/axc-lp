var express = require('express');
var router = express.Router();
var crypto = require("crypto");
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    //sessionにユーザーIDが残っていればdashboardへ飛ぶ
    res.redirect('/dashboard');
  } else {
    res.render('login', {
      title: 'AXC ICO Login'
    });
  }
});

router.post('/', function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  const shasum = crypto.createHash('sha256');
  shasum.update(password);
  let hash = shasum.digest('hex');

  var query = 'SELECT user_id FROM users WHERE email = "' + email + '" AND password = "' + hash + '" LIMIT 1';
  connection.query(query, function(err, rows) {
    var userId = rows.length? rows[0].user_id: false;
    if (userId) {
      req.session.user_id = userId;
      res.redirect('/dashboard');
    } else {
      res.render('login', {
        title: 'ログイン',
        noUser: 'There are no users that match these.'
      });
    }
  });
});

module.exports = router;