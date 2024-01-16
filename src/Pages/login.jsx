import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import './login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login } = useUserContext();
    const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 201) {
                const userData = await response.json();
                login(userData.username);

                navigate('/program');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="custom-container">
            <div className="custom-content">
                <form className="custom-form" onSubmit={handleSubmit}>
                <div className="welcome-text">LOGIN HERE</div>
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
                        Log In
                    </button>

                    <p className="custom-paragraph">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;