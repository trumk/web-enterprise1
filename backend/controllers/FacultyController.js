const mongoose = require("mongoose");
const Faculty = require("../models/Faculty")

function createFaculty(req, res){
    const faculty = new Faculty({
      facultyName: req.body.facultyName,
      descActive: req.body.descActive,
       
    });
    return faculty
    .save()
    .then((newFaculty)=>{
        return res.status(200).json({
            success: true,
            message:'New Faculty created successfully',
            Faculty: newFaculty,
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
function getAllFaculty(req, res){
    Faculty.find() //to retrieve all Facultys from the database.
    .select('facultyName descActive') //properties
    .then((allFaculty)=>{
        return res.status(200).json({
            success: true,
            message: 'A list of all Faculty',
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

function updateFaculty(req, res) {
    const id = req.params.facultyId; 
    const updateObject = req.body; //update data from the request body as json, contain field edit 
    // update query using mongo
    Faculty.updateOne({ _id:id }, { $set:updateObject })  //to retrieve id, set object update operationwith request body 
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
    const id = req.params.facultyId; // request parameters
    Faculty.findOneAndDelete(id)
      .exec()
      .then(()=> res.status(204).json({
        success: true,
      }))
      .catch((err) => res.status(500).json({
        success: false,
      }));
  };

module.exports = {
    createFaculty,
    updateFaculty,
    deleteFaculty,
    getAllFaculty
};