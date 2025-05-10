import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useFlash } from '../FlashContext';

const Login = () => {
  const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, password } = credentials;

    if (!user || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username: user, password })
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess('Login Successful');
        setCurrUser(data.user);
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="login-card">
      <p>{error}</p>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user"
          placeholder="Username"
          value={credentials.user}
          onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account ? <Link to="/signup" color='blue'>Sign up</Link></p>
    </div>
  );
};

export default Login;