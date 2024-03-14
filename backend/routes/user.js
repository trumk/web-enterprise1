const userController = require("../controllers/userController");

const route = require("express").Router();

route.get("/getAllUsers", userController.getAllUsers);

route.delete("/delete/:id", userController.deleteUser)

module.exports = route;