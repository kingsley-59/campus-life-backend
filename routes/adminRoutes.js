const express = require("express");
const adminRoute = express.Router();
const adminAuth = require("../middleware/adminAuth");

const {
    getAdmins,
    upgradeToAdmin,
    dismissAdmin
} = require("../controllers/adminController");
const { auth } = require("../middleware/auth");

adminRoute.get("/getAdmins", auth, adminAuth, getAdmins);
adminRoute.put("/upgrade/:id", auth, adminAuth, upgradeToAdmin);
adminRoute.put("/dismiss/:id", auth, adminAuth, dismissAdmin);

module.exports = {
  adminRoute,
};
