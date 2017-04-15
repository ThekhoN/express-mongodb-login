const authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

// middleware to handle auth for incoming request and then connect to router
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function router(app){
  // check auth
  app.get('/special', requireAuth, function(req, res, next){
    res.send(`Hey! you are special :)`)
  });

  app.get('/', function(req, res, next){
    res.json(`we are at '/'`);
  });

  app.get('/signup', function(req, res, next){
    res.json(`we are at '/signup'`);
  });

  app.post('/signup', authentication.signup);
};
