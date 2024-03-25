const { userController, profileController} = require("../controllers/userController");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/getAllUsers", authorization.verifyAdmin, userController.getAllUsers);

router.get("/profile", authorization.verifyToken, userController.getProfile);

router.delete("/delete/:id", authorization.verifyUserOrAdmin, userController.deleteUser)

route.get("/:id", profileController.readProfile);

route.put("/:id", authorization.verifyUserOrAdmin, profileController.updateProfile);

module.exports = route;


