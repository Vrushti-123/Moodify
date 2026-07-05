const songModel = require("../models/song.model")
const id3 = require("node-id3") 
const storageService = require("../services/storage.services")

async function uploadSong(req, res){
    console.log(req.file)

    //If the user forgets to upload a file, then:
    // Before accessing req.file, check that it exists:
    if (!req.file) {
        return res.status(400).json({
            message: "Please upload an audio file"
        });
    }
    const songBuffer = req.file.buffer

    const tags = id3.read(songBuffer)
    //yeh id3.read directly humse buffer hi maangta hai
    //and multer hume buffer hi return karta hota hai :) 

    console.log(tags)

    //Some MP3 files don't contain ID3 tags at all. 
    // This prevents trying to upload a file with an undefined filename
    if (!tags.title) {
        return res.status(400).json({
            message: "Unable to read song metadata."
        });
    }
    /*
    const songFile = await storageService.uploadFile({
        buffer: songBuffer,
        filename: tags.title,
        folder: "/MOODIFY/songs"
    })

    const posterFile = await storageService.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + ".jpeg",
        folder: "/MOODIFY/posters"
    })
    */
   //itne ko select karke tell AI to convert it into promise.all

   const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            filename: tags.title,
            folder: "/MOODIFY/songs"
        }),
        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            filename: tags.title + ".jpeg",
            folder: "/MOODIFY/posters"
        })
    ])
    //isse bohot hi time optimization hota hai. 
    // Coz humari song ki file and poster ki file dono ko saath mein 
    // imagekit pe upload karan satrt kar deta hai, so that it doesnt 
    // have to do it twice. once for songfile and another for posterfile, 
    // so usko kam wakt lagta hai.

    //Promise.all --> jab tak array ke andar ke saare kaam complete
    // na ho jaaye tab tak aage na badhe.
    

    const {mood} = req.body
    
    //finaaly sab milne ke baad we are creating the song in the songModel
    const song = await songModel.create({
        title: tags.title,
        url: songFile.url,
        posterURL: posterFile ? posterFile.url : "",
        mood
    })

    res.status(201).json({
        message: "Songs created successfully",
        song
    })
}

async function getSong(req, res){
    
    const {mood} = req.query

    /*
    const song = await songModel.findOne({
        mood
    })
    */

    const song = await songModel.aggregate([
        {
            $match: { mood }
        },
        {
            $sample: { size: 1 }
        }
    ]);
    //find song on the basis of mood,
    //sample --> randomly ek select karega out of all the songs

    if (song.length === 0) {
        return res.status(404).json({
            message: "No songs found for this mood"
        });
    }
    
    res.status(200).json({
        message: "Song fetched successfully",
        song: song[0]
    })
}

module.exports = {
    uploadSong,
    getSong
}