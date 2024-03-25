const mongoose = require("mongoose");
const { User, Otp } = require("../models/User")
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        validate: {
          validator: (value) => /^[a-zA-Z]+$/.test(value.trim()),
          message: 'First name must only contain letters (a-z, A-Z).'
        }
      },
      lastName: {
        type: String,
        required: true,
        validate: {
          validator: (value) => /^[a-zA-Z]+$/.test(value.trim()),
          message: 'Last name must only contain letters (a-z, A-Z).'
        }
      },
    birthDay:{
        type : Date,
        required: true
    },
    avatar:{
        type : String,
        default: null
    },
    description:{
        type : String,
        default: null
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
module.exports = mongoose.model("Profile", profileSchema);
