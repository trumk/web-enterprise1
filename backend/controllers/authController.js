const { User, Otp } = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const authController = {
    registerUser : async(req, res) => {
        try {
            const lengthPassword = await req.body.password.length;
            if(lengthPassword<4) 
            return res.status(400).send("Password needs to be longer than 4 characters");
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user in database
            const newUser = await new User({
                userName : req.body.userName,
                email : req.body.email,
                password: hashed,
            });

            //save to db
            const user = await newUser.save();
            res.cookie('email', req.body.email);
            //create new otp in database
            const otpRender = Math.floor(100000 + Math.random() * 900000).toString();
            const newOtp = await new Otp({
                email: req.body.email,
                otp: otpRender
            });
            await newOtp.save();
            const mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: 'Your OTP',
                html: `<p>Your OTP is <b>${otpRender}</b></p>`,
            };
            const sendMailPromise = new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                });
            });
            await sendMailPromise;
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    verifyUser : async(req, res) => {
        try {
            const email = req.cookies.email;
            const otp = req.body.otp;
            const emailOtp = await Otp.findOne({ email: email, otp: otp });
            if(!emailOtp){
                const checkUser = await User.findOne({ email: email });
                if (checkUser.isVerified) {
                    return res.status(400).json("You already verified.");
                } else {
                    return res.status(400).json("Wrong otp, please try again or you are not signup before.");
                }
            }
            const user = await User.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true });
            if (!user) {
                return res.status(404).json("User not found");
            }
            await Otp.deleteOne({ _id: emailOtp._id });
            res.status(200).json({"messenger":"Verified successfully", user});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    loginUser : async(req, res)=> {
        try {
            //find username of user
            const user = await User.findOne({email: req.body.email});
            res.cookie('email', user.email);
            if(!user){
                return res.status(404).json("Wrong Email");
            }
            //decrypt hash and compare
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(404).json("Wrong password");
            }
            const isVerified = await user.isVerified;
            if(!isVerified){
                return res.status(403).json("Your account is not verified");
            }
            if(user && validPassword && isVerified){
             const accessToken =  jwt.sign({
                    id: user.id,
                    role: user.role
                },
                process.env.ACCESS_KEY,
                { expiresIn: "2h" }
                );
                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    deleteUser : async(req, res, next)=>{
        try {
           const user = req.params._id; 
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = authController;