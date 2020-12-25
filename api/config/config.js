require("dotenv/config");

module.exports = {
  HOST: process.env.HOST_MYSQL,
  USER: process.env.USER_MYSQL,
  PASSWORD: process.env.PASSWORD_MYSQL,
  DB: process.env.DB_MYSQL,
  dialect: process.env.DIALECT_ACTUAL,
  pool: {
    max: 5,
    min: 0,
    acquire: process.env.MAX_TIME_CONNECTION_BEFORE_ERRO,
    idle: process.env.MAX_TIME_CONNECTION_WITHOUT_USE,
  },
};
