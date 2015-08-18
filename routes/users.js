var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addnewuser', function(req, res, next){
	var mongoose = require('mongoose');
	var User = require('./models/user');


})

module.exports = router;
