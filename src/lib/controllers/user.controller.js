var app = express(),
    User = require('../models/user-model'),
    agenda = require('../worker.js');

app.post('/users', function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err) {
    if(err) return next(err);
    agenda.now('registration email', { userId: user.primary() });
    res.send(201, user.toJson());
  });
});