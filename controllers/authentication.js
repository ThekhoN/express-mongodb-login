const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  // sub - subject of the encode
  // iat - issued at time
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, config.secret);
}

const authentication = {
  signup: function(req, res, next){
      const email = req.body.email;
      const password = req.body.password;

      if(!email || !password){
        return res.status(422).send({error: 'email & password required'});
      }

      User.findOne({email: email}, function(err, existingUser){
        if(err){
          return next(err);
        }

        if(existingUser){
          return res.status(422).send({error: 'email already in use'});
        }

        const user = new User({
          email: email,
          password: password
        });

        user.save(function(err){
          if(err){
            return next(err);
          }
          else {
            // res.json({"success": "true"});
            res.json({ token: tokenForUser(user) });
          }
        });
      });
  }
};

module.exports = authentication;
