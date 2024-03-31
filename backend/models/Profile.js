const mongoose = require("mongoose");
const { User, Otp } = require("../models/User")
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: {
        type: String,
        default: null
      },
    lastName: {
        type: String,
        default: null
      },
    birthDay:{
        type : Date,
        default: null
    },
    avatar:{
        type : String,
        default: null
    },
    description:{
        type : String,
        default: null
    },
    facultyID:{
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        default: null
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
module.exports = mongoose.model("Profile", profileSchema);
