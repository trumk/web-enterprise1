const mongoose = require("mongoose");
const Event = require("../models/Event");
const Faculty = require("../models/Faculty");

async function createEvent(req, res) {
  const { topic, content, closureDate, finalDate, facultyId } = req.body;

  // validate required fields
  if (!topic || !finalDate || !facultyId) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: topic, finalDate, or facultyId'
    });
  }
  const faculty = await Faculty.findById(facultyId);
  if (!faculty) {
    return res.status(404).json({
      success: false,
      message: 'Faculty not found with ID: ' + facultyId
    });
  }

  const newEvent = new Event({
    topic,
    content,
    closureDate,
    finalDate,
    facultyId
  });

  await newEvent.save();

  res.status(200).json({
    success: true,
    message: 'new event created successfully',
    event: {
      ...newEvent.toObject(),
      facultyName: faculty.facultyName
    }
  });
}
async function getAllEvent(req, res) {
  try {
    const events = await Event.find()
      .populate('facultyId', 'facultyName') //show
      .select('topic content closureDate finalDate facultyId');

    return res.status(200).json({
      success: true,
      message: 'A list of all events',
      events
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: error.message || 'An unknown error occurred'
    });
  }
}

function updateEvent(req, res) {
    const id = req.params.eventId; 
    const updateObject = req.body; //update data from the request body as json, contain field edit 
    if (!updateObject.topic || !updateObject.finalDate || !updateObject.Faculty) {
      return res.status(400).json({
          success: false,
          message: 'missing required fields'
      });
  }
  if (updateObject.faculty) {
    updateObject.faculty = mongoose.Types.ObjectId(updateObject.faculty); 
  }

    // update query using mongo
    Event.updateOne({ _id:id }, { $set:updateObject })  //to retrieve id, set object update operationwith request body 
      .exec() //execute update query built
      //exec success 
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'event is updated',
          updateEvent: updateObject,
        });
      })
      //exec error
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: 'Server error. Please try again.'
        });
      });
  };
 
  function deleteEvent(req, res) {
    const id = req.params.eventId;
  
    Event.findOneAndDelete(id)
      .exec()
      .then(deleteEvent => {
        if (!deleteEvent) {
          return res.status(404).json({
            success: false,
            message: "event not found with ID: " + id
          });
        }
  
        //  deleted successfully
        return res.status(204).json({
          success: true
        });
      })
      .catch(err => res.status(500).json({
        success: false,
        message: "error deleting : " + err.message
      }));
  }
module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvent
};