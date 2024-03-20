const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const authentication ={
    verifyToken : (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_KEY,(error, user)=>{
                if(error){
                    return res.status(403).json("Token is not valid");
                }
                req.user = user;
                next();
            })
        }
        else{
            return res.status(401).json("You are not authenticated");
        }
    },
    verifyAdmin : (req, res, next)=>{
        authentication.verifyToken(req, res , ()=> {
            if(req.user.role == "admin"){
                next();
            }
            else{
                return res.status(403).json("You don't have permission");
            }
        })
    },
    verifyUserOrAdmin : (req, res, next)=>{
        authentication.verifyToken(req, res , ()=> {
            if(req.user.id == req.params.id || req.user.role == "admin"){
                next();
            }
            else{
                return res.status(403).json("You don't have permission");
            }
        })
    },
    verifyMarketingCoodinator : (req, res, next)=>{
        authentication.verifyToken(req, res , ()=> {
            if(req.user.role == "admin" || req.user.role == "marketing coodinator"){
                next();
            }
            else{
                return res.status(403).json("You don't have permission");
            }
        })
    },
    verifyMarketingManager : (req, res, next)=>{
        authentication.verifyToken(req, res , ()=> {
            if(req.user.role == "admin" || req.user.role == "marketing manager"){
                next();
            }
            else{
                return res.status(403).json("You don't have permission");
            }
        })
    },
    verifyStudent : (req, res, next)=>{
        authentication.verifyToken(req, res , ()=> {
            if(req.user.role == "admin" || req.user.role == "student"){
                next();
            }
            else{
                return res.status(403).json("You don't have permission");
            }
        })
    }
}

module.exports = authentication;