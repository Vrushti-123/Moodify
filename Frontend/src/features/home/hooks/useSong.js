import { useContext } from "react";
import { getSong, getSongsByMood } from "../services/song.api";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext)

    const {loading, setloading, song, setSong, playlist, setPlaylist} = context

    async function handleGetSong(mood){

        // agar face detect nahi hua (expression undefined aayi), toh API hi mat maaro
        if(!mood) return

        // console.log(mood);
        setloading(true)

        try {
            const data = await getSong({mood})
            const selectedSong = data.song
            setSong(selectedSong)

            // isi mood ke hisaab se, humare khud ke uploaded saare songs
            // ki shuffled playlist bhi laa lete hai (right column ke liye)
            const listData = await getSongsByMood({mood})

            // selectedSong pehle se hi listData.songs mein kahi bhi ho sakta hai,
            // usse wahan se hata ke, sabse upar (index 0) pin kar dete hai
            // taaki naye songs add hone par bhi user ko scroll karke
            // dhoondhna na pade ki abhi konsa song chal raha hai
            const remainingSongs = listData.songs.filter(
                (item) => item._id !== selectedSong._id
            )
            setPlaylist([selectedSong, ...remainingSongs])
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    function handleSelectSong(selectedSong){
        // jab user playlist mein se koi song click kare, wahi ab currently playing ban jaaye
        if(!selectedSong) return
        setSong(selectedSong)
    }

    function getCurrentIndex(){
        if(!song || !playlist?.length) return -1
        return playlist.findIndex((item) => item._id === song._id)
    }

    function handleNextSong(){
        // agar playlist khaali hai ya song set nahi hai, toh kuch mat karo
        if(!playlist?.length) return

        const currentIndex = getCurrentIndex()

        // agar current song playlist mein nahi mila (index -1), toh pehle wale se shuru karo
        // warna, agle wale par chale jaao (aur last ke baad wapas pehle wale par loop kar jaao)
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % playlist.length

        setSong(playlist[nextIndex])
    }

    function handlePrevSong(){
        if(!playlist?.length) return

        const currentIndex = getCurrentIndex()

        // pichle wale par jaao (aur pehle se pehle, last wale par loop kar jaao)
        const prevIndex = currentIndex === -1 ? 0 : (currentIndex - 1 + playlist.length) % playlist.length

        setSong(playlist[prevIndex])
    }

    function resetSong(){
        // logout/login ke time pichle user ka song aur playlist context mein
        // reh na jaaye, isliye dono ko wapas khaali kar dete hai
        setSong(null)
        setPlaylist([])
    }

    return ({loading, song, playlist, handleGetSong, handleSelectSong, handleNextSong, handlePrevSong, resetSong})
}
