const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const FacultyController = require('../controllers/FacultyController');
const authorization = require("../middlewares/authorization");
const multer = require('multer');
const upload = multer();

router.use(authorization.verifyToken);

router.post("/add", FacultyController.createFaculty);
router.get("/get", FacultyController.getAllFaculty);
router.put("/:facultyId", FacultyController.updateFaculty);
router.delete("/:facultyId", FacultyController.deleteFaculty);
router.post("/search", upload.none(), FacultyController.searchFaculty);
router.get("/:id", FacultyController.getOneFaculty);
router.post("/enroll", FacultyController.enrollStudent)

module.exports = router;