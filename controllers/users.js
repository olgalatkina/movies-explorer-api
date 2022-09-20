const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const { CodeSuccess, Message } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET, SALT_ROUNDS } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, Number(SALT_ROUNDS))
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(CodeSuccess.CREATED).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(Message.USER_CONFLICT));
        return;
      }
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(CodeSuccess.OK).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError(Message.USER_NOT_FOUND))
    .then((user) => res.status(CodeSuccess.OK).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(Message.USER_CONFLICT));
        return;
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
