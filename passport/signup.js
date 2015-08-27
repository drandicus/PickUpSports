var LocalStrategy   = require('passport-local').Strategy;
var User = require('../routes/models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    /*
        Based on the PassportJS tutorial
        Creates a new local strategy and named 'signup' to
        create a new user and log him in
    */
	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){

                User.findOne({ 'email' :  username }, function(err, user) {

                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    
                    if (user) {
                        console.log('User already exists with email: '+ username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {

                        var newUser = new User();


                        newUser.email = username;
                        newUser.password = createHash(password);
                        newUser.firstName = req.param('firstname');
                        newUser.lastName = req.param('lastname'); 

                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
            };
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}