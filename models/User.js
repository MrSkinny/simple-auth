var mongoose = require('mongoose');
var validator = require('../utils/validator');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }
})

var User = mongoose.model('User', UserSchema);

module.exports = User;

