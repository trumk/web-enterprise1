const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    loginUser : async(req, res)=> {
        try {
            //find username of user
            const user = await User.findOne({email: req.body.email});
            if(!user){
                return res.status(404).json("Wrong Email");
            }
            //decrypt hash and compare
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword){
                return res.status(404).json("Wrong password");
            }
            if(user && validPassword){
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