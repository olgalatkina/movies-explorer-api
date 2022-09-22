const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { signupValidator, signinValidator } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { Message } = require('../utils/constants');

router.post('/signup', signupValidator, createUser);
router.post('/signin', signinValidator, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError(Message.PAGE_NOT_FOUND));
});

module.exports = router;
