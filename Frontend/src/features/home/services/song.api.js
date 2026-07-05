import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000",         //this was for before deployment 
    withCredentials:true
})

export async function getSong({mood}){
    const response = await api.get("api/song?mood=" + mood)
    //backend mein prefix mein humne "song" lihkha hai, "songs" nahi
    
    return response.data
}