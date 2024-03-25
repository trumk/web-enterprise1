const { User, Otp } = require("../models/User")
const Profile = require("../models/Profile")

const userController = {
    
    getAllUsers : async(req, res)=>{
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error);
        }
    },
    setRoleUser : async(req, res)=>{
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

    deleteUser : async(req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if(!user){
                return res.status(404).json("User not found");
            }
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Delete Successfully")         
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getProfile: async(req, res) =>{
        try {
            const userID = req.user.id;
            const profile = await Profile.findOne({userID:userID});
            if(!profile)
            {
                return res.status(404).json("Profile not found");
            }
            res.status(200).json(profile) ;
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;