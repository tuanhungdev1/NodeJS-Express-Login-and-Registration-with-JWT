const db = require("../models/index");

const ROLES = db.ROLES;

const User = db.user;

//Kiem tra username hoac email da ton tai.
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    //Kiem tra Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is alrealy in use!",
      });
    }

    //Kiem tra Email
    let email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(400).send({
        message: "Failed! Email is alrealy in use!",
      });
    }

    next();
  } catch (err) {
    return res.status(500).send({
      message: "Unable to validate Username!",
    });
  }
};

//Kiem tra vai tro khi nguoi dung chon
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles && req.body.roles.length > 0) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
