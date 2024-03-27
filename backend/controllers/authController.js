const { User, Otp } = require("../models/User")
const Profile = require("../models/Profile")
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

function generateVerifyMail(user, otp) {
    return jwt.sign({
        id: user._id,
        otp: otp.otp
    },
        process.env.OTP_KEY,
        { expiresIn: "24h" }
    )
};

function generateAccessToken(user) {
    return jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.ACCESS_KEY,
        { expiresIn: "2h" }
    )
};

function generateRefreshToken(user) {
    return jwt.sign({
        id: user.id,
        role: user.role
    },
        process.env.REFRESH_KEY,
        { expiresIn: "365d" }
    )
};


const authController = {
    registerUser: async (req, res) => {
        try {
            const lengthPassword = await req.body.password.length;
            if (lengthPassword < 4)
                return res.status(400).send("Password needs to be longer than 4 characters");
            //hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //create new user in database
            const newUser = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: hashed,
            });

            //save to db
            const user = await newUser.save();
            const newProfile = new Profile({
                userID: user._id,
            });
            await newProfile.save();
            await res.cookie('email', req.body.email, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            //create new otp in database
            const otpRender = Math.floor(100000 + Math.random() * 900000).toString();
            const newOtp = new Otp({
                user: user._id,
                otp: otpRender
            });
            await newOtp.save();
            const verifyLink = `http://localhost:5503/verifylink?token=${generateVerifyMail(user, newOtp)}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Your OTP',
                html: `<p>Your OTP is <b>${otpRender}</b></p><br>
                <p>Or click <a href="${verifyLink}">here</a> to verify your account.</p>`,
            };
            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                });
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    verifyUser: async (req, res) => {
        try {
            const email = req.cookies.email;
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(404).json("User not found");
            }
            if (user.isVerified) {
                return res.status(400).json("You are already verified.");
            }
            const otp = req.body.otp;
            const emailOtp = await Otp.findOne({ user: user._id, otp: otp });
            if (!emailOtp) {
                return res.status(400).json("Wrong otp, please try again or you are not signup before.");
            }
            const userUpdate = await User.findOneAndUpdate({ _id: user._id }, { isVerified: true }, { new: true });
            await Otp.deleteOne({ _id: emailOtp._id });
            res.status(200).json({ "message": "Verified successfully", userUpdate });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    verifyByLink: async (req, res) => {
        try {
            const token = req.query.token;
            jwt.verify(token, process.env.OTP_KEY, async (error, decoded) => {
                if (error) {
                    return res.status(403).json("Token is not valid");
                }

                const user = await User.findOne({ _id: decoded.id })
                if (!user) {
                    return res.status(404).json("User not found");
                }
                if (user.isVerified) {
                    return res.status(400).json("You are already verified.");
                }
                const userUpdate = await User.findOneAndUpdate({ _id: decoded.id }, { isVerified: true }, { new: true });
                await Otp.deleteOne({ user: decoded.id });
                res.status(200).json({ "message": "Verified successfully", userUpdate });
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },


    loginUser: async (req, res) => {
        try {
            //find username of user
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json("User is not found");
            }
            await res.cookie('email', user.email, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            await res.cookie('userId', user._id, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict"
            });
            //decrypt hash and compare
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(404).json("Wrong password");
            }
            const isVerified = await user.isVerified;
            if (!isVerified) {
                return res.status(403).json("Your account is not verified");
            }
            if (user && validPassword && isVerified) {
                const accessToken = generateAccessToken(user);
                if (!user.Token) {
                    const refreshToken = generateRefreshToken(user);
                    await User.findByIdAndUpdate(user._id, { Token: refreshToken });
                }
                res.cookie("refreshToken", user.Token, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
                const { password, Token, ...others } = user._doc;
                res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json("You're not authenticated");
    
        try {
            const user = await User.findOne({ Token: refreshToken });
            if (!user) {
                return res.status(403).json("Refresh token is not valid");
            }
    
            jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, decoded) => {
                if (err) {
                    return res.status(403).json("Refresh token is not valid");
                }
                const newAccessToken = generateAccessToken(decoded);
                const newRefreshToken = generateRefreshToken(decoded);
                await User.findByIdAndUpdate(user._id, { Token: newRefreshToken });    
                res.cookie("refreshToken", newRefreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                });
    
                res.status(200).json({
                    accessToken: newAccessToken,
                });
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
      logOut: async (req, res) => {
        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
      },

    changePassword: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;
            const confirmPassword = req.body.confirmPassword;

            if (!user) {
                return res.status(404).json("User not found");
            }
            const validPassword = await bcrypt.compare(currentPassword, user.password);
            if (!validPassword) {
                return res.status(401).json("Current Password is not correct");
            }
            if (currentPassword == newPassword) {
                return res.status(400).json("The current password must be different from the new password");
            }
            const lengthPassword = newPassword.length;
            if (lengthPassword < 4) {
                return res.status(400).json("Password needs to be longer than 4 characters");
            }
            if (newPassword != confirmPassword) {
                return res.status(401).json("New Password do not match");
            }
            if (validPassword && newPassword == confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const hashed = await bcrypt.hash(newPassword, salt);
                await user.updateOne({ password: hashed }, { new: true });
                const { password, Token, ...others } = user._doc;
                res.status(200).json({ "messenger": "Change password successfully", ...others });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = authController;