import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

//isko sirf logged in user acces kar payega
//once user state has been updated to some user
// (after successful log in), tabhi ye page khulega

const Protected = ({children}) => {

    const {User, loading} = useAuth()

    if(loading){
        return <h1> Loading... </h1>
    }

    if(!User){
        return <Navigate to="/login" />
    }

  return children
}

export default Protected
