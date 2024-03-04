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
    isVerified:{
        type : Boolean,
        default: false
    },
    role:{
        type: String,
        default: 'user'
    }
},
    {timestamps:true}
);

const otpSchema = new mongoose.Schema({
    email:{ 
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{ 
        type: Date, 
        default: Date.now
    }
});
const User = mongoose.model("User", userSchema);
const Otp = mongoose.model("Otp", otpSchema);

module.exports = { User, Otp };