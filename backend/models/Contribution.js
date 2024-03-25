const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contributionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: [{
        type: String,
        required: true
    }],
    file: [{
        type: String,
        required:true
    }],
    isPublic: {
        type: Boolean,
        default: false
    },
    comments: [{
        content: {
            type: String,
            required: true
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    }],
    userID:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    eventID:{
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const contribution = mongoose.model("Contribution", contributionSchema);
module.exports = contribution;