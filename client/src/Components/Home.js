import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
    <div className='outer-wrapper'>
      <div className='inner-wrapper'>
        <h1>Welcome to the Website Analytical tool</h1>

        <p>The Website Analytical tool can be used to calculate the loading speed performance of the website</p>
        <nav>
          <ul>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Home;
