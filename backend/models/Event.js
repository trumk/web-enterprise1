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
        default:Date.now
    },
    finalDate:{
        type:Date,  
        default:Date,
        required: true
    },
    facultyId: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty' // Tham chiếu đến model Faculty
      }
    

});
module.exports = mongoose.model("Event", eventSchema);