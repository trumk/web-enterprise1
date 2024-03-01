const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type : String,
        require: true,
        minLenght: 4,
        maxLenght: 12,
        unique: true
    },
    email:{
        type : String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        require: true,
        minLenght: 4,
        maxLenght: 30,
        unique: true        
    },
    password:{
        type : String,
        require: true,
        minLenght: 4,
        maxLenght: 12
    },
    role:{
        type: String,
        default: 'user'
    }
},
    {timestamps:true}
);

module.exports = mongoose.model("User", userSchema, 'user');