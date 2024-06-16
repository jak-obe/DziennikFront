// src/components/Login.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import App from '../../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loged, setLoged] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('api/Account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const data = await response.json();

    if (response.ok) {
      setLoged(true);
      console.log('Login successful!');
      // console.log(data);
      // Handle the response data here (e.g., save token, redirect user)
    } else {
      setLoged(false);
      console.log('Login failed:');
      // console.log(data.message);
    }
  };

  if (loged) {
    return <Navigate replace to="/profile" />;
  } 
else {

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}}
;

export default Login;
