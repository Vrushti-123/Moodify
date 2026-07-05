const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, "URL is required for the song"]
    },
    posterURL: {
        type: String,
        required: [true, "PosterURL is required for the song"]
    },
    title: {
        type: String,
        required: [true, "Title is required for the song"]
    },
    mood: {
        type: String,
        required: [true, "Mood is required for the song"],
        enum: {
            values: ["sad", "happy", "surprised"],
            message: "Only Sad Happy or Surprised is allowed..."
        }
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel