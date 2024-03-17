require("dotenv").config();

module.exports = {
  HOST: process.env.HOST_DB,
  USER: process.env.USER_DB,
  PASSWORD: process.env.PASSWORD_DB,
  DB: process.env.NAME_DB,
  dialect: process.env.NAME_SQL,
};
