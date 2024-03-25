const authController = require("../controllers/authController");
const authorization = require("../middlewares/authorization");

const router = require("express").Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/verify", authController.verifyUser);

router.get("/verifylink", authController.verifyByLink);

router.post("/logout", authController.logOut);

router.post("/refresh", authController.requestRefreshToken);


router.post("/changePassword/:id", authorization.verifyUserOrAdmin, authController.changePassword);

module.exports = router;