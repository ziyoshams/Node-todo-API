const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _  = require('lodash');

var UserSchema = new mongoose.Schema({
  email:{
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value)=>{
        return validator.isEmail(value);
      },
      message: "{VALUE} is not valid"
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'])
};

UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123');

  user.tokens.push({access: access, token: token});
  return user.save().then(()=>{
    return token;
  });
};
var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}
