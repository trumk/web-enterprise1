const authController = require("../controllers/authController");
const authentication = require("../middlewares/authentication");

const route = require("express").Router();

route.post("/register", authController.registerUser);

route.post("/login", authController.loginUser);

route.post("/verify", authController.verifyUser);

route.get("/verifylink", authController.verifyByLink);

route.post("/logout", authController.logOut);

route.post("/changePassword/:id", authentication.verifyUserOrAdmin, authController.changePassword);

module.exports = route;