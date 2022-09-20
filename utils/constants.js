const CodeError = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  ALREADY_EXISTS: 409, // ConflictError
  SERVER_ERROR: 500,
};

const CodeSuccess = {
  OK: 200,
  CREATED: 201,
};

const Message = {
  BAD_REQUEST: 'Переданы некорректные данные',
  MOVIE_NOT_FOUND: 'Фильм с указанным id не найден',
  MOVIE_FORBIDDEN: 'Отсутствуют права на удаление фильма',
  USER_CONFLICT: 'Такой пользователь уже существует',
  USER_NOT_FOUND: 'Пользователь не найден',
};

module.exports = {
  CodeError,
  CodeSuccess,
  Message,
};
