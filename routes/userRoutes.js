const express = require("express");
const userRoute = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const adminAuth = require("../middleware/adminAuth");

require("../middleware/passportConfig")(passport);

const {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { register, login, auth, tokenIsValid } = require("../middleware/auth");

userRoute.get("/getUser/:id", auth, getUser);
userRoute.get("/getUsers", auth, adminAuth, getUsers);
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/tokenIsValid", tokenIsValid);
userRoute.put("/updateUser/:id", auth, updateUser);
userRoute.delete("/deleteUser/:id", auth, deleteUser);

// Redirect the user to the Google signin page
userRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Retrieve user data using the access token received
userRoute.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    jwt.sign(
      { user: req.user },
      process.env.secretKey,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          return res.json({
            token: null,
          });
        }
        res.json({
          token,
        });
      }
    );
  }
);

// profile route after successful sign in
userRoute.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.user);
    res.send("Welcome");
    next();
  }
);

module.exports = {
  userRoute,
};
