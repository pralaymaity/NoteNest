
const express = require("express");
const authRoute = express.Router();
const authController = require("../controller/auth.controller");

authRoute.post("/signup", authController.signup);
authRoute.post("/signin", authController.signin);

module.exports = authRoute;


