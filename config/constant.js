const ValidUserName = {
  MIN_NAME_LENGTH: 1,
  MAX_NAME_LENGTH: 12,
};

const ValidPassword = {
  MIN_PASSWORD_LENGTH: 8,
};

const tokenExpires = {
  ACCESS_TOKEN_EXPIRES: "3h",
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTORIZED: 401,
  FORBIDDEN: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  ACCESS_TOKEN_EXPIRED: 432,
  UNABLE_TO_PARSE_TOKEN: 433,
  TOKEN_IS_ALREADY_USED: 436,
  INTERNAL_SERVER_ERROR: 500,
};

const RateLimitVariables = {
  rateTime: 15 * 60 * 1000,
  rateLimit: 10,
};

const CurrentYear = new Date().getFullYear();
const CurrentMonth = new Date().getMonth() + 1;

module.exports = {
  ValidUserName,
  HttpCode,
  tokenExpires,
  RateLimitVariables,
  ValidPassword,
  CurrentYear,
  CurrentMonth,
};
