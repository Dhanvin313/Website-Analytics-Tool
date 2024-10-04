import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("User registered successfully:", result);
        navigate('/login'); // Redirect to login page on success
      } else {
        console.error("Registration failed:", result);
        alert("Registration Failed")
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
    <div className='outer-wrapper'>
      <div className='inner-wrapper'>
        <form onSubmit={handleSubmit} className='registrationform'>
          <div>
            <label>Name: </label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password: </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className='loginregfoot'>
          <nav>
            <ul>
              <li><Link to="/login"> Existing User? Login</Link></li>
              <li><Link to="/"> Home</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
