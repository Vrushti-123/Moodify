import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000",        //this was before deployement
    baseURL: "https://moodify-mklh.onrender.com", //this for checking UI while still developing
    withCredentials:true
})

export async function getSong({mood}){
    const response = await api.get("api/song?mood=" + mood)
    //backend mein prefix mein humne "song" lihkha hai, "songs" nahi
    
    return response.data
}

export async function getSongsByMood({mood}){
    const response = await api.get("api/song/list?mood=" + mood)
    //isse humein current mood ke saare (already-shuffled) songs milte hai

    return response.data
}