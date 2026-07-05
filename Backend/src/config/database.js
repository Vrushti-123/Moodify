const mongoose = require("mongoose")

function connectToDB(){
    console.log(process.env.MONGO_URI);
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch(err => {
        console.log("Error connecting to DB", err)
    })
}

module.exports = connectToDB