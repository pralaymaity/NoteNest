
const express = require("express");
const authRoute = express.Router();
const authController = require("../controller/authController");

authRoute.post("/signup", authController.signup);
authRoute.post("/signin", authController.signin);

module.exports = authRoute;


