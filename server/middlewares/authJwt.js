const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.users;
const Role = db.ROLES;

verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try{
    const decoded = await jwt.verify(token, config.secret);
    req.userId = decoded.id;
    next();
  }
  catch (err) {
    return res.status(401).send({
        message: "Unauthorized!",
      });
  }
};

isStudent = async (req, res, next) => {
  try {
    const user = await User.findOne(req.userId).exec();
    const role = await Role.findOne({_id: user.role});

    if(role.name === "student") {
        next();
    } else {
        res.status(403).send({ message: "Require Student Role!" });
    }
  }
  catch (err) {
    res.status(500).send({ message: err });
  }
};

isLecturer = async (req, res, next) => {
    try {
        const user = await User.findOne(req.userId).exec();
        const role = await Role.findOne({_id: user.role});

        if(role.name === "lecturer") {
            next();
        } else {
            res.status(403).send({ message: "Require Student Role!" });
        }
      }
      catch (err) {
        console.log(err)
        res.status(500).send({ message: err });
      }
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne(req.userId).exec();
        const role = await Role.findOne({_id: user.role});

        if(role.name === "admin") {
            next();
        } else {
            res.status(403).send({ message: "Require Student Role!" });
        }
      }
      catch (err) {
        console.log(err)
        res.status(500).send({ message: err });
      }
};

const authJwt = {
  verifyToken,
  //isLecturer,
  //isStudent,
  //isAdmin
};
module.exports = authJwt;