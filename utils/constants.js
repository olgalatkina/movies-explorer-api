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
  UNAUTHORIZED: 'Неправильные почта или пароль',
  BAD_REQUEST: 'Переданы некорректные данные',
  MOVIE_NOT_FOUND: 'Фильм с указанным id не найден',
  MOVIE_FORBIDDEN: 'Отсутствуют права на удаление фильма',
  USER_BAD_EMAIL: 'Некорректный адрес электронной почты',
  USER_CONFLICT: 'Такой пользователь уже существует',
  USER_NOT_FOUND: 'Пользователь не найден',
  VALIDATION_BAD_REQUEST: 'Некорректная ссылка',
  PAGE_NOT_FOUND: 'Страница не найдена',
  SERVER_ERROR: 'На сервере произошла ошибка',
};

module.exports = {
  CodeError,
  CodeSuccess,
  Message,
};
