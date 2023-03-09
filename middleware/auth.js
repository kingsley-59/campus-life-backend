const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const apiResponse = require('../helpers/apiResponse');

const secretKey = process.env.SECRET;

const register = async (req, res) => {
  let { email, password } = req.body;
  const salt = await bcrypt.genSalt();

  bcrypt.hash(password, salt, async (err, hash) => {
    if (err) {
      res.status(500).send({ data: {}, message: err, status: 1 });
    } else {
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res.status(400).json({
          data: {},
          message: "An account with this email already exists",
          status: 1,
        });
      const user = new User({
        email: email,
        password: hash,
        fullname: req.body.fullname,
        institution: req.body.institution,
      });
      user.save(async (err, user) => {
        if (err) {
          res.status(500).send({
            data: {},
            message: `An error occured during registration: ${err}`,
            status: 1,
          });
        } else {
          if (email === process.env.bossMail) {
            const superAdmin = new Admin({
              email,
              userId: user._id,
              adminRole: "superadmin",
            });
            await superAdmin.save();
          }
          res.status(201).send({
            data: user,
            message: "User registered successfully",
            status: 0,
          });
        }
      });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, async (err, user) => {
    if (err) {
      res.status(500).send({ data: {}, message: err, status: 1 });
    } else if (!user) {
      res.status(401).send({
        data: {},
        message: `User with ${email} not found!`,
        status: 1,
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).send({ data: {}, message: err, status: 1 });
        } else if (!result) {
          res.status(401).send({
            data: {},
            message: "Email or password is incorrect",
            status: 1,
          });
        } else {
          const token = jwt.sign({ id: user._id }, secretKey, {
            expiresIn: "3d",
          });
          res.status(200).send({
            data: {
              token,
              id: user._id,
              email: user.email,
              role: user.role,
              fullname: user.fullname,
              phoneNumber: user.phoneNumber,
              isVerified: user.isVerified,
            },
            message: "User logged in successfully",
            status: 0,
          });
        }
      });
    }
  });
};

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ msg: "No authenication token, authorization denied" });

  try {
    const verfied = jwt.verify(token, process.env.SECRET);
    if (!verfied)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

    req.user = verfied.id;
    next();
  } catch (error) {
    apiResponse.unauthorizedResponse(res, error.message);
  }
};

const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
};

module.exports = {
  register,
  login,
  auth,
  tokenIsValid,
};
