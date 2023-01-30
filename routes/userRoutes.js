const express = require("express");
const userRoute = express.Router();

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { register, login, auth, tokenIsValid } = require("../middleware/auth");

userRoute.get("/getUser/:id", auth, getUser);
userRoute.get("/getUsers", getUsers);
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/tokenIsValid", tokenIsValid);
userRoute.put("/updateUser/:id", auth, updateUser);
userRoute.delete("/deleteUser/:id", auth, deleteUser);

module.exports = {
  userRoute,
};
