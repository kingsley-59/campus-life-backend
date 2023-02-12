const User = require("../models/userModel");

const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" });
    res.status(200).send({
      data: users,
      message: "CampusLife Admins",
      status: 0,
    });
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const upgradeToAdmin = async (req, res) => {
  try {
        let { id } = req.params;

        let right = "admin";

        let userUpgrade = {
            role: right,
        };
        //update the user to admin
        const updatedUser = await User.findByIdAndUpdate(
            id,
            userUpgrade,
        );
        res
        .status(201)
        .send({ data: updatedUser, message: "User Updated", status: 0 });
  } catch (err) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

const dismissAdmin = async (req, res) => {
  try {
    let { id } = req.params;

    let right = "user";

    let dismissUser = {
        role: right,
    };
    //update the admin to user
    const updatedUser = await User.findByIdAndUpdate(
        id,
        dismissUser,
    );
    res
    .status(201)
    .send({ data: updatedUser, message: "User Updated", status: 0 });
  } catch (err) {
    res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

module.exports = {
  getAdmins,
  upgradeToAdmin,
  dismissAdmin,
};
