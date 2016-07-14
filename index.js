var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('./models/User');

var validator = require('./utils/validator');

var app = express();

var jsonParser = bodyParser.json();


app.get('/users', function(req, res){
  User.find({}, function(err, users){
    if (err) res.status(500).json({ message: 'Internal server error' });

    return res.status(200).json(users);
  });
});

app.post('/users', jsonParser, function(req, res){
  var validatorResponse = validator('User', req);

  if (!validatorResponse.error) {
    var user = new User({
      username: validatorResponse.username,
      password: validatorResponse.password
    });

    user.save(function(err){
      if (err) return res.status(500).json({ message: err.errmsg });

      return res.status(201).json({ username: user.username })
    });
  } else {
    res.status(validatorResponse.status).json(validatorResponse.json);
  }

});

mongoose.connect('mongodb://localhost/simple-node')
  .then(function(){
    app.listen(8000, function(){
      console.log('Server started on 8000...');
    });
  })
  .catch(function(err){
    console.error(err);
  });

