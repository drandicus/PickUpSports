var LocalStrategy   = require('passport-local').Strategy;
var User = require('../routes/models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    /*
        Based on PassportJS tutorial
        Applies a new local strategy to passport and names is login
        To be used during the authentication process
    */
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
        	console.log('here');
            User.findOne({ 'email' :  username }, 
                function(err, user) {

                    if (err)
                        return done(err);
                
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                     
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    
                    return done(null, user);
                }
            );

        })
    );

    /*
        Returns a comparison using the password provided and hashed password
    */
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}