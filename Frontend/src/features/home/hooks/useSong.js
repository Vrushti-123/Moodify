import { useContext } from "react";
import { getSong } from "../services/song.api";
import { SongContext } from "../song.context";


export const useSong = () => {
    const context = useContext(SongContext)

    const {loading, setloading, song, setSong} = context

    async function handleGetSong(mood){

        // agar face detect nahi hua (expression undefined aayi), toh API hi mat maaro
        if(!mood) return

        // console.log(mood);
        setloading(true)

        try {
            const data = await getSong({mood})
            setSong(data.song)
        } catch (err) {
            console.log(err)
        } finally {
            setloading(false)
        }
    }

    return ({loading, song, handleGetSong})
}