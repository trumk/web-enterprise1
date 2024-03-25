
const authentication = require("../middlewares/authentication");
const { userController, profileController} = require("../controllers/userController");

const route = require("express").Router();

route.get("/getAllUsers", authentication.verifyAdmin, userController.getAllUsers);

route.delete("/delete/:id", authentication.verifyUserOrAdmin, userController.deleteUser)

route.post("/updateRole/:id", authentication.verifyAdmin, userController.setRoleUser);



route.get("/:id", profileController.readProfile);
route.put("/:id",profileController.updateProfile);

module.exports = route;