const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");

const route = require("express").Router();

route.get("/getAllUsers", authentication.verifyAdmin, userController.getAllUsers);

route.delete("/delete/:id", authentication.verifyUserOrAdmin, userController.deleteUser)

module.exports = route;