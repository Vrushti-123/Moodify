import React, { useState } from 'react'
import "../styles/register.scss"
import FormGroup from '../components/FormGroup'
import {Link, useNavigate} from "react-router"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const {loading, handleRegister} = useAuth()
      const navigate = useNavigate()
  
      const [username, setUsername] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
  
      async function handleSubmit(e){
          e.preventDefault()
          await handleRegister({email,password, username})
          navigate("/")
      }


    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <FormGroup label="Name" placeholder="Enter your name" 
                    value ={username}
                    onChange={(e)=>{setUsername(e.target.value)}} 
                    />
                    <FormGroup label="Email" placeholder="Enter your email" 
                    value ={email}
                    onChange={(e)=>{setEmail(e.target.value)}} 
                    type="email"
                    />
                    <FormGroup
                        label="Password"
                        placeholder="Enter your password"
                        value ={password}
                        onChange={(e)=>{setPassword(e.target.value)}} 
                        type="password"
                    />

                    <button className='button' type="submit">Register</button>
                </form>
                <p>Already have an account? <Link to="/login"> Login Here </Link></p>
            </div>
        </main>
    )
}

export default Register