import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from "../storage/store"
import "./Login.css"



const Login = () => {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const {setState} = useContext(authContext)

const navigate = useNavigate()

const senData = (e) =>{
e.preventDefault()

if(email === "simran@gmail.com" && password === "1234"){
    setState(true)
    navigate('/user')
}
}

  return (
    <div className='Container'>
        <form onSubmit={senData} className='d-flex flex-column w-50 mx-auto my-4'>
            <input type='text' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
            <input type='text' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            <input type='submit' value={"Login"} />
        </form>
    </div>
  )
}

export default Login