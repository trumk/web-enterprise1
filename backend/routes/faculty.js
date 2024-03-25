const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const FacultyController = require('../controllers/FacultyController');


router.post("/add", FacultyController.createFaculty);
router.get("/get", FacultyController.getAllFaculty);
router.put("/:facultyId", FacultyController.updateFaculty);
router.delete("/:facultyId", FacultyController.deleteFaculty);
router.get("/search", FacultyController.searchFaculty);

module.exports = router;