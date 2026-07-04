
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api.js'
import '../styles/auth.css'

const Login = () => {
    const navigate =useNavigate()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const handleLogin=async (e)=>{
        e.preventDefault()
        if(!email || !password){
            toast.warning("All fields are required");
            return 
        }
        if(password.length <8){
            
            toast.warning("Password must be 8 characters long");
            return 
        }
        try{
 const response=await api.post('/user/login',{email,password})
        const {token,user}=response.data
        localStorage.setItem("user",JSON.stringify(user))
        localStorage.setItem("token",token)
        setEmail("")
        setPassword("")
        navigate('/dashboard')
        }
        catch(error){
    console.error(error);

   toast.error(
    error.response?.data?.message ||
    "Something went wrong"
);
}
       
    }
  return (
    <>
    <div>
    <div className="auth-page">

    <div className="auth-card">

        <h1>Expense Tracker</h1>

        <p>Welcome back! Sign in to continue.</p>

        <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
            />

            <label>Password</label>

            <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
            />

            <button type="submit">

                Sign In

            </button>

        </form>

        <p className="auth-footer">

            Don't have an account?

            <Link to="/register">

                Register

            </Link>

        </p>

    </div>

</div>

    </div>
    </>
  )
}

export default Login