const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required for Black-listing"],
        unique: [true, "Same token cannot be blacklisted again!"]
    }
}, {
    timestamps: true
    //kab user ne token ko blaclist kar diya tha 
})

const blacklistModel = mongoose.model("blacklist", blacklistSchema)

module.exports = blacklistModel