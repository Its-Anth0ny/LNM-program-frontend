// signup.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';  // Make sure to include the correct CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                // Successful signup
                console.log('Signup successful!');
                // Redirect to login page
                window.location.href = '/login';
            } else {
                // Failed signup
                console.error('Signup failed:', response.statusText);
                // TODO: Handle errors appropriately, e.g., display an error message to the user.
            }
        } catch (error) {
            console.error('Error:', error.message);
            // TODO: Handle errors appropriately, e.g., display an error message to the user.
        }
    };

    return (
        <div className="custom-container">
            <div className="custom-content">
                <form className="custom-form" onSubmit={handleSubmit}>
                    <div className="welcome-text">SIGNUP HERE</div>
                    <label className="custom-label" htmlFor="username">
                        Username:
                    </label>
                    <input
                        className="custom-input"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <label className="custom-label" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="custom-input"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="custom-label" htmlFor="password">
                        Password:
                    </label>
                    <input
                        className="custom-input"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button className="custom-button" type="submit">
                        Sign Up
                    </button>

                    <p className="custom-paragraph">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
