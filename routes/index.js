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


/*
	Method to display the model list depending on the model used
	Used for testing only
*/
var setList = function(model){
	model.find({}, function(err, list){
		res.json(list);
	})
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
		res.render('index', { message: req.flash('message') });
	});

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET Add Game Page */
	router.get('/add', isAuthenticated, function(req, res){
		res.render('add');
	})

	/* GET Search Game Page */
	router.get('/search', isAuthenticated, function(req, res){
		res.render('search');
	})

	/* GET Profile Page */
	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile');
	})

	/* GET Settings Page */
	router.get('/settings', isAuthenticated, function(req, res){
		res.render('settings');
	})

	/* GET Game History Page */
	router.get('/history', isAuthenticated, function(req, res){
		res.render('history');
	})

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* Following Methods for User Testing */
	router.get('/userlist', function(req, res){
		var User = require('./models/user');
		setList(User);	
	})

	router.get('/gameslist', function(req, res){
		var Game = require('./models/game');
		setList(Game);
	})

	router.get('/resetuser', function(req, res){
		var User = require('./models/user');
		User.find({}).remove(function(err, product){
			res.send({msg: 'ALL DELETED'});
		})
	})

	return router;
}