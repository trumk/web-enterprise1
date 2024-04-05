const { userController, profileController} = require("../controllers/userController");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();

const {uploadImage, uploadFile, upload, multerErrorHandler} = require("../middlewares/cloudinary");

router.get("/getAllUsers", authorization.verifyAdmin, userController.getAllUsers);

router.get("/profile", authorization.verifyToken, profileController.readProfile);

router.delete("/delete/:id", authorization.verifyAdmin, userController.deleteUser)

router.get("/:userID", profileController.readProfile);

router.put("/:id", authorization.verifyUserOrAdmin, uploadImage.single('avatar'), multerErrorHandler, profileController.updateProfile);

module.exports = router;


