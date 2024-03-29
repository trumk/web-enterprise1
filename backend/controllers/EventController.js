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

  try {
  
    if (!mongoose.Types.ObjectId.isValid(facultyId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid facultyId format'
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
      message: 'New event created successfully',
      event: {
        ...newEvent.toObject(),
        facultyName: faculty.facultyName
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again',
      error: error.message
    });
  }
}
//closuredate by monthyear
function FilterExpression(filter) {
  const filterExpression = {};
  for (const key in filter) {
    if (filter.hasOwnProperty(key)) {
      if (key === 'closureDate') {
        if (filter[key].hasOwnProperty('year') && filter[key].hasOwnProperty('month')) {
          const selectedYear = filter[key].year;
          const selectedMonth = filter[key].month - 1; //  zero-based in js
          const startDate = new Date(selectedYear, selectedMonth, 1); //set year and month first is 1
          const endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999); //end of the selected month +1 next 0 end 4time
          filterExpression[key] = { $gte: startDate, $lte: endDate }; //$gte >=, $lte <=
        } else {
          return { error: 'error' };
        }
      } else if (key === 'facultyId') {
         //facultyId
        filterExpression[key] = filter[key];
      } else {
        filterExpression[key] = filter[key];
      }
    }
  }
  return filterExpression;
}


async function getAllEvent(req, res) {
  try {
    let filterExpression = {};
    if (req.query.filter) {
      try {
        const filter = JSON.parse(req.query.filter);
        filterExpression = FilterExpression(filter);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: 'invalid filter',
          error: err.message
        });
      }
    }

    const eventsQuery = Event.find(filterExpression)
      .populate('facultyId', 'facultyName')
      .select('topic content closureDate finalDate facultyId');

   //check
    if (filterExpression.closureDate && filterExpression.closureDate.$gte && filterExpression.closureDate.$lte) {
      eventsQuery.where('closureDate').gte(filterExpression.closureDate.$gte).lte(filterExpression.closureDate.$lte);
    }

    const events = await eventsQuery
    .exec();

    return res.status(200).json({
      success: true,
      message: 'A list of all events',
      events: events || []
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

function getOneEvent(req, res) {
  const id = req.params.eventId;
  res.cookie("eventId", id, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "strict",
  });
  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found with ID: ' + id,
        });
      }
      res.status(200).json({
        success: true,
        message: 'Event found',
        Event: event,
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: err.message,
      });
    });
};

function updateEvent(req, res) {
  const id = req.params.eventId;
  const updateObject = req.body; //update data from the request body as json, contain field edit 
  if (!updateObject.topic || !updateObject.finalDate || !updateObject.facultyId) {
    return res.status(400).json({
      success: false,
      message: 'missing required fields'
    });
  }
  if (updateObject.faculty) {
    updateObject.faculty = mongoose.Types.ObjectId(updateObject.faculty);
  }

  // update query using mongo
  Event.updateOne({ _id: id }, { $set: updateObject })  //to retrieve id, set object update operationwith request body 
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
  getAllEvent,
  getOneEvent
};
