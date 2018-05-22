var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var connection = require('../mysqlConnection');

router.get('/', function(req, res, next) {
    res.render('deposit', {
        title: 'deposit',
      });
  });

  /*
  router.post('/:board_id', function(req, res, next) {
    var message = req.body.message;
    var boardId = req.params.board_id;
    var userId = req.session.user_id? req.session.user_id: 0; // 追加
    var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
    var query = 'INSERT INTO messages (message, board_id, user_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + userId + '", ' + '"' + createdAt + '")'; // 変更
    connection.query(query, function(err, rows) {
      res.redirect('/boards/' + boardId);
    });
  });
*/
module.exports = router;