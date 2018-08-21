const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  name: String,
  googleId: String,
  email: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    default: ''
  }
});

userSchema.methods.validatePassword = async function(password) {
  return new Promise(async (resolve, reject) => {
    const res = await bcrypt.compare(password, this.password);
    if (res) {
      resolve(this);
    } else {
      reject('invalid password bruh');
    }
  });
};

userSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

mongoose.model('User', userSchema);
