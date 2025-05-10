import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Flash from './components/Flash';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup'
import SatelliteWeather from './pages/SatelliteWeather';
import './App.css';
import { useFlash } from './FlashContext';

const App = () => {
  const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();
  useEffect(() => {
    fetch('http://localhost:8080/api', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.loggedIn) {
          console.log(data);
          setCurrUser(data.user);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <Flash />
      <div className="app-body">
        <Routes>
          <Route path="/" element={currUser ? <Home /> : <Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/satellite" element={<SatelliteWeather />} />
        </Routes>
      </div>
    </>
  );
};

export default App;