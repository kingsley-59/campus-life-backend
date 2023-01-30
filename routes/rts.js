const express = require("express");
const routeManager = express.Router();

const { hello } = require("../controllers/testController");

routeManager.get("/", hello);

module.exports = {
  routeManager,
};
