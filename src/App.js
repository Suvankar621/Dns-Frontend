import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './components/AuthenticationPage/Login/Login';
import Register from './components/AuthenticationPage/Register/Register';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/Home';
import Loader from './components/Loader/Loader';
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    axios.get("https://dns-management-system-backend-azure.onrender.com/api/v1/users/me", {
      withCredentials: true,
    }).then(res => {
      setLoading(false); // Set loading to false when request is completed
      setUser(res.data.user);
      setIsAuthenticated(true);
      setAuthToken(res.data.authtoken);
    }).catch(error => {
      setLoading(false); // Set loading to false even if there's an error
    });
  }, []);

  if (loading) {
    return <div className="App"><Loader /></div>; // Display loader while loading
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} />
      
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home User={user} Authtoken={authToken} />} />
        <Route path='/login' element={<Login isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} />} />
        <Route path='/register' element={<Register isAuthenticated={isAuthenticated} setisAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </Router>
  );
}

export default App;
