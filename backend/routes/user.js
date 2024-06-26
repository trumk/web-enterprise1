const { userController, profileController} = require("../controllers/userController");
const authorization = require("../middlewares/authorization");
const router = require("express").Router();
const multer = require('multer');
const upload = multer();

const {uploadImage, multerErrorHandler} = require("../middlewares/cloudinary");

router.get("/getAllUsers", authorization.verifyAdmin, userController.getAllUsers);

router.get("/profile", authorization.verifyToken, profileController.readProfile);

router.delete("/delete/:id", authorization.verifyAdmin, userController.deleteUser)

router.get("/:userID", profileController.readProfile);

router.put("/:id", authorization.verifyToken, uploadImage.single('avatar'), multerErrorHandler, profileController.updateProfile);

router.post("/setRole/:id", upload.none(), authorization.verifyAdmin, userController.setRoleUser);

module.exports = router;


