const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type : String,
        require: true,
        minLength: 4,
        maxLength: 12,
        unique: true
    },
    email:{
        type : String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        require: true,
        minLength: 4,
        unique: true        
    },
    password:{
        type : String,
        require: true,
        minLength: 4
    },
    role:{
        type: String,
        default: 'user'
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("User", userSchema, 'user');