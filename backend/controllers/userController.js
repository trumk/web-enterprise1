
const { User, Otp } = require("../models/User");
const mongoose = require("mongoose");
const Profile = require("../models/Profile");


const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find()
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error);
    }
  },
  setRoleUser: async (req, res) => {
    try {
      const userUpdated = await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true }
      );
      if (!userUpdated) {
        return res.status(404).json("User not found");
      }
      const { password, ...others } = userUpdated._doc;
      res.status(200).json({ "messenger": "Change role successfully", ...others });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user) {
        return res.status(404).json("User not found");
      }
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Delete Successfully")
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

const profileController = {
  readProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await Profile.findById(id).populate('userID', 'username');
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const updateObject = req.body;
      if (!updateObject.firstName || !updateObject.lastName || !updateObject.birthDay) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }
      const updatedProfile = await Profile.findByIdAndUpdate
        ( id,
          updateObject,
          { new: true }
        );
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  },

}

module.exports = { userController, profileController };