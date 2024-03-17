require("dotenv").config();
module.exports = {
  secret: process.env.SECRET_KEY,
  jwtExpriration: +process.env.JWT_EXPRIRATION,
  jwtRefreshExpiration: +process.env.JWT_REFRESHEXPIRATION,
};
