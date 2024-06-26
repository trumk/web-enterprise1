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
    createEvent:{
        type:Date,
        default:Date.now
    },
    closureDate:{
        type:Date,
        default:Date,
        required: true
    },
    finalDate:{
        type:Date,  
        default:Date,
        required: true
    },
    facultyId: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty' ,
        required: true
      }
    

});
module.exports = mongoose.model("Event", eventSchema);