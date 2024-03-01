const authController = require("../controllers/authController");

const route = require("express").Router();

route.post("/register", authController.registerUser);

route.post("/login", authController.loginUser);

module.exports = route;