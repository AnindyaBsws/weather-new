import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useFlash } from '../FlashContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();
  const logout = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            setSuccess('Log out Successful');
            setCurrUser(null);
            navigate('/login');
        } else {
            setError(data.error || 'Logout failed. Please try again.');
            navigate('/');
        }
    } catch (err) {
        console.error(err);
        setError('Unable to connect to the server. Please try again later.');
        navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Weather Monitoring System</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="#about" onClick={() => document.getElementById('footer').scrollIntoView({ behavior: 'smooth' })}>About</Link></li>
        {!currUser && <li><Link to="/login">Login</Link></li>}
        {!currUser && <li><Link to="/signup">Sign up</Link></li>}
        {currUser && <li><Link onClick={logout}>Log out</Link></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
