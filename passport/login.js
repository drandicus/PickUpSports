var LocalStrategy   = require('passport-local').Strategy;
var User = require('../routes/models/user');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport){


	passport.use('login', new LocalStrategy({
			passReqToCallback: true
		},
		function(req, username, password, done){
			User.findOne({'email': username}, function(err, user){
				if(err) return done(err);
				if(!user){
					console.log('User Not Found');
					return done(null, false, req.flash('message', 'User Not Found'));
				}

				if(!isValidPassword(user, password)){
					console.log('Invalid Password');
					return done(null, false, req.flash('message', 'Invalid Password'));
				}
				return done(user);
			})
		}
	));

	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, User.password);
	}

}