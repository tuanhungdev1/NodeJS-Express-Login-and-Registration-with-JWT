const db = require("../models/index");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    //Save user to Database
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 8),
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);

      if (result) {
        res.status(201).send({
          message: "User registered successfully!",
        });
      } else {
        const result = user.setRoles([1]);
        if (result)
          res.status(201).send({
            message: "User registered successfully!",
          });
      }
    }
  } catch (err) {
    return res.status(500).send({
      message: "Unable Sign Up ==> Error: " + err.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({
        message: "User Not found!",
      });
    }

    const passwordIdValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIdValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: config.jwtExpriration,
    });

    let refreshToken = await RefreshToken.createToken(user);

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.status(500).send({
      message: "Unable Sign Up ==> Error: " + err.message,
    });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    const refreshToken = await RefreshToken.findOne({
      where: {
        token: requestToken,
      },
    });

    if (!refreshToken) {
      return res.status(403).send({
        message: "Refresh token is not in database",
      });
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({
        where: {
          id: refreshToken.id,
        },
      });

      res.status(403).send({
        message: "Refresh token was expired. Please make a new signin request",
      });

      return;
    }

    const user = await refreshToken.getUser();

    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpriration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.signout = async (req, res) => {
  try {
    req.headers["x-access-token"] = null;

    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};
