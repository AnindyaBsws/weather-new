import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { useFlash } from './../FlashContext';

const Signup = () => {
  const { success, error, currUser, setSuccess, setError, setCurrUser } = useFlash();
  const [credentials, setCredentials] = useState({ email: '', mobile: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, email, mobile, password } = credentials;

    if (!user || !email || !mobile || !password) {
      setError('Please fill all the fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ user, email, mobile, password })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess('Signup Successful');
        setCurrUser(data.user);
        navigate('/');
      } else {
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="signup-card">
      <h2>Sign Up</h2>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="user"
          placeholder="Username"
          value={credentials.user}
          onChange={(e) => setCredentials({ ...credentials, user: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="number"
          name="mobile"
          placeholder="Mobile"
          value={credentials.mobile}
          minLength={10}
          maxLength={10}
          onChange={(e) => setCredentials({ ...credentials, mobile: e.target.value })}
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
      <p>Already have an account ? <Link to="/login" color='blue'>Login</Link></p>
    </div>
  );
};

export default Signup;