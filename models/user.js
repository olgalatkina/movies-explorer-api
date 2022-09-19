const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnAuthorizedError = require('../errors/UnAuthorizedError');