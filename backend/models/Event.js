const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    content:{
        type:String
    },
    closureDate:{
        type:Date,
        default:Date.now,
        required: true
    },
    finalDate:{
        type:Date,
        default:Date,
        reuqired: true
    }

});
module.exports = mongoose.model("Event", eventSchema);