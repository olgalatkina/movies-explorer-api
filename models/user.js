const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const { Message } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: Message.USER_BAD_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnAuthorizedError(Message.UNAUTHORIZED));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnAuthorizedError(Message.UNAUTHORIZED));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
