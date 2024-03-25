import React, { useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";
import { Navigate } from "react-router-dom";

const Login = ({isAuthenticated,setisAuthenticated}) => {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")

  const handleSubmitLogin=async(e)=>{
    e.preventDefault();
    try {
        const {data}=await axios.post("https://dns-management-system-backend-azure.onrender.com/api/v1/users/login",{
          email,
          password
        },{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
        })
        setisAuthenticated(true);
        toast.success(data.message);
    } catch (error) {
        toast.error("Invalid Credentials");
    }
   
  }
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="LoginContainer">
      <h1>Login</h1>

      <form onSubmit={handleSubmitLogin}>
        <input type="email" value={email} className="email" placeholder="Enter your Email" onChange={(e)=>setemail(e.target.value)} />
        <input type="password" value={password} className="password" placeholder="Enter your Password" onChange={(e)=>setpassword(e.target.value)}/>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
