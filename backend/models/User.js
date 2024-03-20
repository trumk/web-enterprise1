const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type : String,
        match: [/^\S+$/, "UserName should not contain spaces"],
        required: true,
        minLength: 4,
        maxLength: 20,
        unique: true
    },
    email:{
        type : String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true,
        minLength: 4,
        unique: true        
    },
    password:{
        type : String,
        match: [/^\S+$/, "Password should not contain spaces"],
        required: true,
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
    otp:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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