const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// create JwtStrategy options
const JwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create JwtStrategy
const jwtLogin = new JwtStrategy(JwtOptions, function (payload, done) {
  // payload encoded jwt token with sub & iat
  User.findById(payload.sub, function(err, user){
    if(err){
      return done(err, false);
    }
    if(user){
      return done(null, user); // authenticated
    }
    else {
      return done(null, false);
    }
  });
});


// tell passport to use JwtStrategy
passport.use(jwtLogin);
