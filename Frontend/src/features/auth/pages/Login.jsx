import React, { useState } from 'react'
import "../styles/login.scss"
import FormGroup from '../components/FormGroup'
import {Link, useNavigate} from "react-router"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault()
        await handleLogin({email,password})
        navigate("/")
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <FormGroup 
                    value ={email}
                    onChange={(e)=>{setEmail(e.target.value)}} 
                    type="email"
                    label="Email" placeholder="Enter your email" />

                    <FormGroup 
                    value ={password}
                    onChange={(e)=>{setPassword(e.target.value)}} 
                    type="password"
                    label="Password" placeholder="Enter your password" />

                    <button type="submit">Login</button>
                </form>

                <p>Don't have an account? <Link to="/register"> Register Here </Link></p>
            </div>
        </main>
    )
}

export default Login