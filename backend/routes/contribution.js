const contributionController = require("../controllers/contributionController");
const authorization = require("../middlewares/authorization");
const multer = require('multer')
const {uploadImage, uploadFile, upload, multerErrorHandler} = require("../middlewares/cloudinary");

const router = require("express").Router();

router.use(authorization.verifyToken);

router.post("/submit", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]), multerErrorHandler,contributionController.submitContribution)
router.post("/edit/:id", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]), multerErrorHandler,contributionController.editContribution)
router.get("/getAllContributions", contributionController.getContribution);
router.get("/getMyContribution", contributionController.getMyContribution);
router.get("/:id", contributionController.getOneContribution);
router.get("/edit/:id", contributionController.getOneContribution);
router.delete("/delete/:id", contributionController.deleteContribution);
router.post("/searchByTitle", contributionController.searchByTitleContribution);
router.post("/searchByName", contributionController.searchByNameContribution);
router.get("/sort/asc", contributionController.filterContributionAsc);
router.get("/sort/desc", contributionController.filterContributionDesc);
router.post("/public/:id", authorization.verifyManager, contributionController.publishContribution);
router.post("/comment/:id", contributionController.commentContribution);

module.exports = router;