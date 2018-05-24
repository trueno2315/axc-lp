var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');

const multer = require('multer');
const multerStorage = multer.diskStorage({
destination (req, file, cb) {
cb(null, './upload/tmp');
},
filename (req, file, cb) {
cb(null, req.body.firstname + req.body.lastname + req.session.user_id);
}
});

const upload = multer({ storage: multerStorage });


//walletの登録
router.post('/', upload.any(), function(req, res, next) {
    var lastName = req.body.lastname;
    var firstName = req.body.firstname;
    var idImage = req.body.firstname + req.body.lastname + String(req.session.user_id);
    var userId = req.session.user_id;
    var savedId = "本人確認を実施しました"
    console.log(req.body)
    console.log(req.files)
    var updateidQuery  = 'UPDATE users SET firstname = "' + firstName + '",  lastname = "' + lastName + '", id_image= "' + idImage + '" where user_id = ' + userId + '';
    connection.query(updateidQuery, function(err, rows) {
      console.log(updateidQuery);
        res.render('dashboard', {
            title: 'dashboard',
            savedid: savedId
          });
    });
  });

  module.exports = router;