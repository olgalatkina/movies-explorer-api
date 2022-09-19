const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const { CodeSuccess, Message } = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.status(CodeSuccess.OK).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;

  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: _id,
  })
    .then((movie) => res.status(CodeSuccess.CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(Message.MOVIE_NOT_FOUND))
    .then((movie) => {
      if (req.user._id !== movie.owner._id.toString()) {
        throw new ForbiddenError(Message.MOVIE_FORBIDDEN);
      }
      return Movie.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => {
      res.status(CodeSuccess.OK).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(Message.BAD_REQUEST));
        return;
      }
      next(err);
    });
};
