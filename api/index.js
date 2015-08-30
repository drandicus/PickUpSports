var express = require('express');
var router = express.Router();
var Game = require('../routes/models/game');
var User = require('../routes/models/user');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* Handle Registration POST */
	router.post('/register', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* Handle Login Post */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	router.get('/search_games', function(req, res){
		
	});

	/* Handle Add New Game Post */
	router.post('/add_game', function(req, res){
		var newGame = new Game();

		newGame.host = req.param('host');
		newGame.sport = req.param('sport');
		newGame.loc.lat = req.param('lat');
		newGame.loc.lat = req.param('lat');
		newGame.time = req.param('time');
		newGame.max = req.param('max');
		newGame.priv = req.param('privacy');
		newGame.people = [];

		newGame.save(function(err){
			if(err){
				res.send({msg: err});
			}
			res.send({msg: 'Game Successfully Added'});
		});
	})

	router.put('/edit_game', function(req, res){
		var gameID = req.param('gid');
		var newuser = req.param('email');

		User.find({email: newuser}, function(err, user){
			if(err) res.send({msg: "User Error"});
			if(!user) res.send({msg: "User not found"});

			Game.findById(gameID, function(err, game){
				if(err) res.send({msg: "Game Error"});
				if(!game) res.send({msg: "Game not found"});

				game.people.push(newuser);
				game.save(function(err){
					if(err) res.send({msg: "Save Error"});
				})
			})
		})

	});

	router.delete('/delete_game', function(req, res){});

	return router;
}