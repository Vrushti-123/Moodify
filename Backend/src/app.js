const express = require("express")
const cookieParser = require("cookie-parser")
const connectToDB = require("./config/database")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    // origin: "http://localhost:5173",          //this was for before deployment
    origin: true,                                //this is for after deployment
    credentials: true
}))

//-----------------------------------------------------------------------
const path = require("path")
app.use(express.static('./public'))
//jo bhi humare public folder mein hai, unko publically available bana deti hai
//so jab bhi humara browser kisi unknown API ko request karta hai,
// and it wants these files --> they are made available to them 
//so yeh backend se hi (by the middleware) usko access mil jata hai, 
// (yahi se hi requested file ko response mein send kar deta hai)
//  so yeh API ko aage jaane hi nahi deti
// so humara wildcard use hi nahi hota. usko backend se pehle hi hum handle kar dete hai, with the help of this middleware

//-------------------------------------------------------------

connectToDB();

const authRoutes = require("./routes/auth.routes")
app.use("/api/auth", authRoutes)

const songRoutes = require("./routes/song.routes")
app.use("/api/song", songRoutes)

//-------------------------------------------------------------------
app.use("*name", (req,res)=>{
    // res.send("This is Wild Card")
    res.sendFile(path.join(__dirname, "..","/public/index.html"))
    //yeh humari html file bhejta hai unknown APIs ke response mein

    //now the thing is: humari HTML files bhi kuch files ke liye request bhejti hai (JS and CSS files)
    //so, wo bhi wildcard mein na chali jaaye, uske liye usko handle karna padta hai...
//------------------------------------------------------------------------------------------------
    //"path" (jis package ko require kiya hai) gives us 
    // our absolute path (ye wali folder kaha tak hai uska)
    //then ".." --> bahar nikle current folder ke 
    //then aage ka path join kiya 
    //OMGGGG TOO MUCH WORKKKK!!!
})
//yeh un APIs ko handle karega jo humne create nahi ki hai.
//agar galti se user ne esi API request kar di (postman mein URL mein) jo humne 
// handle nahi ki hai --> toh ye usko handle karega

//------------------------------------------------------------------------------

module.exports = app