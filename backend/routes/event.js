const express = require('express');
const app = express();
const router = express.Router();
const authorization = require("../middlewares/authorization");
const bodyParser = require('body-parser');
const EventController = require('../controllers/EventController');

router.use(authorization.verifyToken);

router.post("/create", authorization.verifyManager, EventController.createEvent);
router.get("/events", EventController.getAllEvent);
router.get("/:eventId", EventController.getOneEvent );
router.put("/update/:eventId", authorization.verifyManager, EventController.updateEvent);
router.get("/update/:eventId", authorization.verifyManager, EventController.getOneEvent);
router.delete("/delete/:eventId",  authorization.verifyManager,EventController.deleteEvent);

module.exports = router;


