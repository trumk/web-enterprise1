const mongoose = require("mongoose");
const Event = require("../models/Event")

function createEvent(req, res){
    const event = new Event({
        topic: req.body.topic,
        content: req.body.content,
        closureDate: req.body.closureDate,
        finalDate: req.body.finalDate,
    });
    return event
    .save()
    .then((newEvent)=>{
        return res.status(200).json({
            success: true,
            message:'New event created successfully',
            Event: newEvent,
        });
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({
            success:false,
            message: 'Server error. Please try again',
            error: error.message,
        });
    });   
  };
function getAllEvent(req, res){
    Event.find() //to retrieve all events from the database.
    .select('topic content closureDate finalDate') //properties
    .then((allEvent)=>{
        return res.status(200).json({
            success: true,
            message: 'A list of all event',
            Event: allEvent,
          });
    })
    .catch((err) => {
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
    // update query using mongo
    Event.updateOne({ _id:id }, { $set:updateObject })  //to retrieve id, set object update operationwith request body 
      .exec() //execute update query built
      //exec success 
      .then(() => {
        res.status(200).json({
          success: true,
          message: 'Event is updated',
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
    const id = req.params.eventId; // request parameters
    Event.findOneAndDelete(id)
      .exec()
      .then(()=> res.status(204).json({
        success: true,
      }))
      .catch((err) => res.status(500).json({
        success: false,
      }));
  };

module.exports = {
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEvent
};



