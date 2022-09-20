const router = require('express').Router();
const { userUpdateValidator } = require('../middlewares/validation');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
