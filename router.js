const Authentication = require('./controllers/authentication');

module.exports = function(app) {
  app.get('/', (req, res, next) => {
    res.send('Hi there!');
  });

  app.post('/signup', Authentication.signup);
};
