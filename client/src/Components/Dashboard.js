import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Dashboard() {

    const navigate = useNavigate(); // Initialize useNavigate hook
    
    const handleLogout = async (e) => {
        try {
        const response = await fetch('http://localhost:8080/api/users/logout', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });
    
        const result = await response.json();
        if (response.ok) {
            console.log("User logout  successful:");
            // Clear the cookie by setting the max-age to 0
            document.cookie = "username=; path=/; max-age=0";
            navigate('/login');  // Redirect to login page after logout
        } else {
            console.error("Logout failed:", result);
        }
        } catch (error) {
        console.error("Error:", error);
        }
        
    };
    
    return (
        <>
            <div>Dashboard</div>
        
            <form className='registrationform'>
                <div>
                    <label>site url:</label>
                    <input type="text" name="url" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}
