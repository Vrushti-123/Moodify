const redis = require("../config/cache");
const identifyUser = require("../middlewares/auth.middleware");
const blacklistModel = require("../models/blacklist.model");
const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

async function registerUser(req,res){
    const {username, email,password} = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    })

    if(isUserAlreadyRegistered){
        return res.status(400).json({
            message: "User with this email or username already exists..."
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username, 
        email,
        password: hash
    })

    const token = jwt.sign(
    {
        id: user._id,
        username: user.username
    }, 
    process.env.JWT_SECRET, 
    {
        expiresIn: "3d"
    })

    res.cookie("token", token, {
        httpOnly: true,                                                         //JavaScript can't read the cookie (more secure).
        secure: process.env.NODE_ENV === "production",                          //Cookies are only sent over HTTPS in production (Render uses HTTPS)
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",       //allows cookies in production if needed; "lax" is convenient during local development.
        maxAge: 3 * 24 * 60 * 60 * 1000                                         //Keeps the user logged in for 3 days.
    });

    return res.status(201).json({
            message: "User registered successfully",
            user
        })
}

async function loginUser(req,res){
    const {email, password, username} = req.body;

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign(
    {
        id: user._id,
        username: user.username
    }, 
    process.env.JWT_SECRET, 
    {
        expiresIn: "3d"
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 3 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        message: "User logged in successfully",
        user
    })

}

async function getMe(req,res){

    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

async function logoutUser(req,res){

    const token = req.cookies.token

    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    // await blacklistModel.create({
    //     token
    // })

    redis.set(token, Date.now().toString(), "EX", 60*60)
    //pehli value(token) --> key
    //dusri value(date) --> key's value

    return res.status(201).json({
        message: "Logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser
}

//GYAAN: 
// here, we write "invalid credentials" instead of "user not found"
// or " incorrect password" because: This is a security best practice 
// known as not revealing whether a username/email exists...

// suppose a hacker tries different email addresses:
// if response is "Incorrect password", The hacker now knows 
// that this email is a registered account...

// if response is "User not found", The hacker now knows that account doesn't exist.

// By doing this repeatedly, they can build a list of valid user emails 
// (called user enumeration) and later try password attacks on those accounts.