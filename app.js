require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
// const router = require('./routes');
// const handleErrors = require('./errors/handleErrors');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002, LOCALHOST = 'mongodb://localhost:27017/moviesdb' } = process.env;
const app = express();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// mongoose.connect(LOCALHOST, {
//   useNewUrlParser: true,
// });
//
// app.use(cors());
// app.use(helmet());
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(requestLogger);

// app.use(limiter);
// app.use(router);

// app.use(errorLogger);
// router.use(errors());
// app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
