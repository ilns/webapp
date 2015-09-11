var checkAuth = require('../middleware/checkAuth');

module.exports = function(app) {

  app.get('/', require('./frontpage').get);

  app.get('/registration', require('./registration').get);
  app.post('/registration', require('./registration').post);

  app.get('/logining', require('./logining').get);
  app.post('/logining', require('./logining').post);

  app.post('/logout', require('./logout').post);

  app.get('/work', checkAuth, require('./work').get);

};