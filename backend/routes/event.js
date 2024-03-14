const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const EventController = require('../controllers/EventController');


router.post("/create", EventController.createEvent);
router.get("/events", EventController.getAllEvent);
router.put("/update/:eventId", EventController.updateEvent);
router.delete("/delete/:eventId", EventController.deleteEvent);

module.exports = router;


