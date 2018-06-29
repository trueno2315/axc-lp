var express = require('express');
var router = express.Router();
var connection = require('../mysqlConnection');
const multer = require('multer');
const path = require('path');
const multerStorage = multer.diskStorage({
destination (req, file, cb) {
    cb(null, './public/upload/tmp');
  },
  filename (req, file, cb) {
    cb(null, req.body.firstname + req.body.lastname + req.session.user_id + path.extname(file.originalname));
    myExt = path.extname(file.originalname);
  }
});

var myExt;
const upload = multer({ storage: multerStorage });


//walletの登録
router.post('/', upload.any(), function(req, res, next) {
    var lastName = req.body.lastname;
    var firstName = req.body.firstname;
    var idImage = req.body.firstname + req.body.lastname + String(req.session.user_id) + myExt;
    var userId = req.session.user_id;
    var savedId = "In the process of Identification... Please wait a little"
    var updateidQuery  = 'UPDATE users SET firstname = "' + firstName + '",lastname = "' + lastName + '", id_image= "' + idImage + '",kyc = 1 where user_id = ' + userId + '';
    connection.query(updateidQuery, function(err, rows) {
      console.log(updateidQuery);
      console.log(err);
      console.log(rows);
        res.render('dashboard', {
            savedid: savedId
          });
    });
  });

  module.exports = router;