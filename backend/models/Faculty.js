const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const facultySchema = new Schema({
    facultyName:{
        type: String,
        required: true,
        unique: true
    },
    descActive:{
        type:String,
        required: true
    }
});
module.exports = mongoose.model("Faculty", facultySchema);