const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    message: {
        type: String,
        required : true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    peopleID:[{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    contributionID:{
        type: Schema.Types.ObjectId,
        ref: "Contribution",
        required: true
    },
    viewed:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
});

const notification = mongoose.model("Notification", notificationSchema);
module.exports =  notification