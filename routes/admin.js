var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next){
    res.render('admin', {
      title: 'admin'
    });
});

router.post('/', function(req,res,next){
    var password = req.body.password;
    if(password === "test"){
      res.redirect('/admin_dashboard/aiu');
    } else {
      res.render('index', {
        title: 'Arteryex ICO'
      });
    }
});

module.exports = router;