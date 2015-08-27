var express = require('express');
var router = express.Router();


/*
	Method to ensure that the user can only access
	the pages if they are authenticated -- Uses PassportJS
*/
var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	} else{
		res.redirect('/');
	}
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Following 2 Methods for User Testing */
	router.get('/userlist', function(req, res){
		var User = require('./models/user');
		User.find({}, function(err, userlist){
			res.json(userlist);
		})	
	})

	router.get('/reset', function(req, res){
		var User = require('./models/user');
		User.find({}).remove(function(err, product){
			res.send({msg: 'ALL DELETED'});
		})
	})

	return router;
}