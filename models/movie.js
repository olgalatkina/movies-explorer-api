const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { Message } = require('../utils/constants');

const urlValidator = {
  validator(url) {
    return isURL(url);
  },
  message: Message.VALIDATION_BAD_URL,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  trailerLink: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  thumbnail: {
    type: String,
    required: true,
    validate: urlValidator,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
