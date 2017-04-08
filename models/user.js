const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  }
});

// on save hook, encrypt password
// before saving model
userSchema.pre('save', function(next){
  const user = this;
  // generate salt
  bcrypt.genSalt(10, function(err, salt){
    if(err){
      return next(err);
    }

    // encrypt password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err){
        return next(err);
      }
      // overwrite text password with encrypted/hashed password
      user.password = hash;
      next(); // go ahead and save the model
    });
  });
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
