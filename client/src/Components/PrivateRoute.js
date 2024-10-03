import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const isAuthenticated = () => {
        const username = getCookie('username');  // Check if the 'username' cookie exists
        return !!username;  // Returns true if the cookie is found
    };
      
    const isAuth = isAuthenticated();  // Use the cookie-based auth check function

    // If the user is not authenticated, redirect to the login page
    return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
