import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User logged in successfully:", result);
        document.cookie = `username=${result.username}; path=/; max-age=3600`; // Cookie valid for 1 hour
        navigate('/dashboard');  // Redirect to dashboard after login
      } else {
        alert("Login Failed");
        console.error("Login failed:", result);
      }
    } catch (error) {
      alert("Opps!! Login Failed");
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className='outregform'>
    <div className='registrationformouter' >
      <form onSubmit={handleSubmit} className='registrationform'>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={loginData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className='loginregfoot'>
        <nav>
          <ul>
            <li><Link to="/register">New User? Register</Link></li>
            <li><Link to="/"> Home</Link></li>
          </ul>
        </nav>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
