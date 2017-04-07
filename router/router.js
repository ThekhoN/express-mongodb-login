const authentication = require('../controllers/authentication');

module.exports = function router(app){
  app.post('/signup', authentication.signup);

  app.get('/', function(req, res, next){
    res.json(`we are at '/'`);
  });

  app.get('/signup', function(req, res, next){
    res.json(`we are at '/signup'`);
  });
};
