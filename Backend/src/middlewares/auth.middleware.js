const redis = require("../config/cache");
const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
    
    // console.log(req.cookies)
    const token = req.cookies.token;

    //if user ne register/log in hi nahi kiya hai then cookies me se token hi nahi milegi...
    if(!token){
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    // const isTokenBlacklisted = await blacklistModel.findOne({token})
    try {
        const isTokenBlacklisted = await redis.get(token)

        if(isTokenBlacklisted){
            return res.status(401).json({
                message: "Invalid Token"
            })
        }
    } catch (err) {
        // agar redis hi down/unreachable ho jaaye, request hang nahi honi chahiye forever.
        // isliye yaha "fail open" kar rahe hai (log karke aage badh jaate hai)
        console.log("Redis error while checking blacklist:", err.message)
    }


    try{
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        )

        req.user = decoded;
        //ye nai property banayi humne. 

        next();
    }
    catch (err){
        console.log(err)

        return res.status(401).json({
            message: "Invalid token"
        })
    }
    
}

module.exports = identifyUser