import axios from "axios"

const api = axios.create({
    // baseURL: "http://localhost:3000",         //this was for before deployment 
    withCredentials:true
})

export async function register({email,password, username}){
    const response = await api.post("/api/auth/register", {
        email, password, username
    })

    return response.data
    //because backend pe humne return kiya response with a status code 
    //and a message and an object called "user"
    //so, "response" variable mein wo store ho jayega :)
}

export async function login({email, username, password,}){
    const response = await api.post("/api/auth/login", {
        email, password, username
    })

    return response.data
}

export async function getMe(){
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function logout(){
    const response = await api.get("/api/auth/logout")
    return response.data
}
