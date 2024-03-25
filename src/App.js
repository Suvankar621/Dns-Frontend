import {BrowserRouter as Router, Route,Routes, Navigate} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Login from './components/AuthenticationPage/Login/Login';
import Register from './components/AuthenticationPage/Register/Register';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';


function App() {
  const [isAuthenticated,setisAuthenticated] =useState(false);
  const [User,setUser] =useState(false);
  const [AuthToken,setAuthToken] =useState("");
 
console.log(isAuthenticated)
  useEffect(()=>{
  
      axios.get("https://dns-management-system-backend-azure.onrender.com/api/v1/users/me",{
        withCredentials:true,
      }).then(res=>{
        setUser(res.data.user);
        setisAuthenticated(true);
        setAuthToken(res.data.authtoken);
      })


    
  },[]);
 



  return (

  <Router>
    <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} />
    <ToastContainer />
    <Routes>
 
      <Route path='/' element={<Home User={User} Authtoken={AuthToken}/>} />
      <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} />} />
      <Route path='/register' element={<Register isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>} />
    </Routes>
  </Router>

  );
}

export default App;
