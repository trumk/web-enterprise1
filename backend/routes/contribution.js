const contributionController = require("../controllers/contributionController");
const authorization = require("../middlewares/authorization");
const multer = require('multer')
const { upload, uploadToFirebase, multerErrorHandler} = require("../middlewares/firebase");
const upload1 = multer();

const router = require("express").Router();
router.get("/getContributionLanding", contributionController.getTop3Contributions);
router.use(authorization.verifyToken);

router.post("/submit",
    upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]),
    uploadToFirebase,multerErrorHandler,
    contributionController.submitContribution
);
router.post("/edit/:id", upload.fields([{ name: 'image', maxCount: 5 }, { name: 'file', maxCount: 5 }]),
    uploadToFirebase, multerErrorHandler,
    contributionController.editContribution)
router.get("/getAllContributions", contributionController.getContributionByDashBoard);
router.get("/getAllContributionsByEvent/:id", contributionController.getContributionByEvent)
router.get("/getMyContribution", contributionController.getMyContribution);
router.post("/statistic", upload1.none(), contributionController.getStatistic);
router.get("/getContributionGuest", contributionController.getContributionByGuest);
router.get("/edit/:id", contributionController.getOneContribution);
router.delete("/delete/:id", contributionController.deleteContribution);
router.post("/searchByTitle", upload1.none(), contributionController.searchByTitleContribution);
router.post("/searchByName", upload1.none(), contributionController.searchByNameContribution);
router.get("/sort/asc", contributionController.filterContributionAsc);
router.get("/sort/desc", contributionController.filterContributionDesc);
router.post("/public/:id", authorization.verifyManager, contributionController.publishContribution);
router.post("/comment/:id", contributionController.commentContribution);
router.get("/notifications", contributionController.getAllNotification);
router.get("/notification/:id", contributionController.getOneNotification);
router.get("/exception", contributionController.getExceptionReports);
router.get("/getContributionByFaculty", contributionController.getContributionByCoordinator);
router.get("/:id", contributionController.getOneContribution);




module.exports = router;