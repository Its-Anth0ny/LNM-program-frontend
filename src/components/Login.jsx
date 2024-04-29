import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import "../utils/App.css";
// import SignupModal from "./SignupModal";

const Login = ({ handleCloseLogin, handleAuth }) => {
    // const [isSignupOpen, setIsSignupOpen] = useState(false);
    // const handleOpenSignup = () => setIsSignupOpen(true);
    // const handleCloseSignup = () => setIsSignupOpen(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
            const response = await fetch(
                "http://localhost:3000/api/users/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.ok) {
                const userData = await response.json();
                login(userData.username);
                handleCloseLogin();
                handleAuth();
                navigate("/program");
            } else {
                alert("Login failed");
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
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
                </form>
                {/* <p className="custom-paragraph">
                    Don't have an account?
                    <button
                        className="signup-link-btn"
                        onClick={() => {
                            handleOpenSignup();
                        }}
                    >
                        Signup
                    </button>
                    <SignupModal
                        isSignupOpen={isSignupOpen}
                        handleCloseSignup={handleCloseSignup}
                    />
                </p> */}
            </div>
        </div>
    );
};

export default Login;
