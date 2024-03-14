const authController = require("../controllers/authController");

const route = require("express").Router();

route.post("/register", authController.registerUser);

route.post("/login", authController.loginUser);

route.post("/verify", authController.verifyUser);

route.post("/changePassword/:id", authController.changePassword);

module.exports = route;