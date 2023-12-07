const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        //Username
        const userByUsername = await User.findOne({ where: {Username: req.body.Username}});
        if (userByUsername) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }
    } catch (err) {
        res.status(500).send({ message: err });
    }

    next();
};

checkRolesExisted = async (req, res, next) => {
    if(!ROLES.includes(req.body.Role)){
        res.status(400).send({
            message: `Failed! Role ${req.body.Role} does not exist!`
        });
        return;
    }
    next();
}

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;