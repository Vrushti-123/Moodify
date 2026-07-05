const express = require("express")
const upload = require("../middlewares/upload.middelware")
const songController = require("../controllers/song.controller")
const songRouter = express.Router()

//yaha se koi bhi koi song upload kar sakega.
songRouter.post("/", upload.single("song"), songController.uploadSong)

//mood batane par, song ko return kar degi
songRouter.get("/", songController.getSong )
module.exports = songRouter