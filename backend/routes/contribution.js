const contributionController = require("../controllers/contributionController");
const authorization = require("../middlewares/authorization");
const multer = require('multer')
const {uploadImage, uploadFile, upload, multerErrorHandler} = require("../middlewares/cloudinary");
const upload1 = multer();

const router = require("express").Router();

router.use(authorization.verifyToken);

router.post("/submit", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]), multerErrorHandler,contributionController.submitContribution)
router.post("/edit/:id", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]), multerErrorHandler,contributionController.editContribution)
router.get("/getAllContributions", contributionController.getContributionByDashBoard);
router.get("/getAllContributionsByEvent", contributionController.getContributionByEvent)
router.get("/getMyContribution", contributionController.getMyContribution);
router.get("/statistic", contributionController.getStatistic);
router.get("/:id", contributionController.getOneContribution);
router.get("/edit/:id", contributionController.getOneContribution);
router.delete("/delete/:id", contributionController.deleteContribution);
router.post("/searchByTitle", upload1.none(),  contributionController.searchByTitleContribution);
router.post("/searchByName", upload1.none(), contributionController.searchByNameContribution);
router.get("/sort/asc", contributionController.filterContributionAsc);
router.get("/sort/desc", contributionController.filterContributionDesc);
router.post("/public/:id", authorization.verifyManager, contributionController.publishContribution);
router.post("/comment/:id", contributionController.commentContribution);


module.exports = router;