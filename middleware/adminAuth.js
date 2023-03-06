const Admin = require("../models/adminModel.js");
const User = require("../models/userModel.js");

const onlyAdmins = async (req, res, next) => {
    try {
      let user = req.user;
      let person = await Admin.findOne({ userId: user });

      if (!person)
          return res
            .status(401)
            .json({msg: "Unauthorized to access this route"});

      next ();
    } catch (err) {
        res.status(500).send({ err: err.message });
    }
};

const addAdmin = async (req, res) => {
    try {
      const {
        email,
        adminRole
      } = req.body;
      const { id } = req.params;
      const user = req.user;
  
      // only superadmin and admin can add user as admin
      let admin = await Admin.findOne({ userId: user });
      if (!admin)
      return res
          .status(401)
          .json({msg: "Unauthorized to access this route"});

      let right = admin.adminRole;
        if ( right !== "superadmin" && right !== "admin" )
            return res
                .status(401)
                .json({msg: "Unauthorized to access this route"});
  
      const newAdmin = new Admin({
        email,
        userId: id,
        adminRole,
      });
  
      const createdAdmin = await newAdmin.save();
      const data = { role: "admin" };
      await User.findByIdAndUpdate(id, data);
  
      res.status(201).send({
        data: createdAdmin,
        message: "Admin Created!",
        status: 0,
      });
    } catch (err) {
      res.status(500).send({ data: {}, error: err.message, status: 1 });
    }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).send({
      data: admins,
      message: "All Admins",
      status: 0,
    });
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

const dismissAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
  
      const admin = await Admin.findOne({
        userId: user,
      });
      if (!admin)
      return res
          .status(401)
          .json({msg: "Unauthorized to access this route"});
  
      // only superadmin and admin can add user as admin
      let right = admin.adminRole;
        if ( right !== "superadmin" && right !== "admin" )
            return res
                .status(401)
                .json({msg: "Unauthorized to access this route"});
  
      await Admin.findByIdAndRemove(id);
      res.status(204).send({ message: "Admin Dismissed", status: 0 });
    } catch (err) {
      res.status(500).send({ data: {}, error: `${err.message}`, status: 1 });
    }
  };

module.exports = { 
    onlyAdmins,
    addAdmin,
    dismissAdmin,
    getAdmins,
};