var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
    if(req.isAuthenticated()){
      res.render('restricted');
    }else{
    	res.send('access denied')
      req.flash('danger','Access Denied.');
      res.redirect('/');
    }
});

module.exports = router;
