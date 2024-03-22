const userController = require("../controllers/userController");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

router.get("/getAllUsers", authorization.verifyAdmin, userController.getAllUsers);

router.delete("/delete/:id", authorization.verifyUserOrAdmin, userController.deleteUser)

router.post("/updateRole/:id", authorization.verifyAdmin, userController.setRoleUser);

module.exports = router;