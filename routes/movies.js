const router = require('express').Router();
const { movieValidator, movieIdValidator } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieValidator, createMovie);
router.delete('/:movieId', movieIdValidator, deleteMovie);

module.exports = router;
