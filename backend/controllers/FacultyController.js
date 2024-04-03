const mongoose = require("mongoose");
const Faculty = require("../models/Faculty")
const Profile = require("../models/Profile")

function createFaculty(req, res) {
  const faculty = new Faculty({
    facultyName: req.body.facultyName,
    enrollKey : req.body.enrollKey,
    descActive: req.body.descActive,
  });
  return faculty
    .save()
    .then((newFaculty) => {
      return res.status(200).json({
        success: true,
        message: 'new Faculty created successfully',
        Faculty: newFaculty,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again',
        error: error.message,
      });
    });
};
function getAllFaculty(req, res) {
  Faculty.find() //to retrieve all Facultys from the database.
    .select('facultyName descActive') //properties
    .then((allFaculty) => {
      return res.status(200).json({
        success: true,
        message: ' all Faculty',
        Faculty: allFaculty,
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
async function searchFaculty(req, res) {
  try {
    const keyword = req.body.keyword;
    const faculties = await Faculty.find({ facultyName: new RegExp(keyword, "i") })
      .select('facultyName descActive');

    if (faculties.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Faculties found',
      faculties: faculties
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
      error: err.message
    });
  }
}


function updateFaculty(req, res) {
  const id = req.params.facultyId;
  const updateObject = req.body; //update data from the request body as json, contain field edit
  if (!updateObject.facultyName || !updateObject.descActive) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: topic or finalDate'
    });
  }
  // update query using mongo
  Faculty.updateOne({ _id: id }, { $set: updateObject })  //to retrieve id, set object update operation with request body 
    .exec() //execute update query built
    //exec success 
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Faculty is updated',
        updateFaculty: updateObject,
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


function deleteFaculty(req, res) {
  const id = req.params.facultyId;

  // ID
  Faculty.findOneAndDelete({_id: id}) //find id
    .exec()
    .then(deletedFaculty => {
      if (!deletedFaculty) {
        return res.status(404).json({
          success: false,
          message: "Faculty not found with ID: " + id
        });
      }
   // deleted successfully
      return res.status(204).json({
        success: true
      });
    })
    .catch(err => res.status(500).json({
      success: false,
      message: "Error: " + err.message
    }));
};


module.exports = {
  createFaculty,
  updateFaculty,
  deleteFaculty,
  getAllFaculty,
  searchFaculty,
  
};