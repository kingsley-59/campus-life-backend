const express = require("express");
const adminRoute = express.Router();

const {
    getAdmins,
    addAdmin,
    onlyAdmins,
    dismissAdmin,
} = require("../middleware/adminAuth");
const { auth } = require("../middleware/auth");

adminRoute.get("/getAdmins", auth, onlyAdmins, getAdmins);
adminRoute.post("/addAdmin/:id", auth, onlyAdmins, addAdmin);
adminRoute.delete("/dismiss/:id", auth, onlyAdmins, dismissAdmin);

module.exports = {
  adminRoute,
};
