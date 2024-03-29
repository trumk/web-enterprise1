const { userController, profileController} = require("../controllers/userController");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

router.get("/getAllUsers", authorization.verifyAdmin, userController.getAllUsers);

router.get("/profile", authorization.verifyToken, profileController.readProfile);

router.delete("/delete/:id", authorization.verifyUserOrAdmin, userController.deleteUser)

router.get("/:userID", profileController.readProfile);

router.put("/:id", authorization.verifyUserOrAdmin, profileController.updateProfile);

module.exports = router;


