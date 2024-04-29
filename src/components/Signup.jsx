import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../utils/App.css";

const Signup = ({ handleCloseSignup }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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
            const response = await fetch(
                "http://localhost:3000/api/users/signup",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            if (response.status === 409) {
                // Signup failed due to conflict (e.g., duplicate email or username)
                const errorData = await response.json();
                alert(errorData.error); // Assuming the error message is provided in the "error" field of the response
                console.error("Signup failed:", errorData.error);
            } else if (response.ok) {
                // Successful signup
                console.log("Signup successful!");
                // close the signup modal
                handleCloseSignup();
                navigate("/program");
            } else {
                // Other signup errors
                console.error("Signup failed:", response.statusText);
                // TODO: Handle other errors appropriately, e.g., display an error message to the user.
            }
        } catch (error) {
            console.error("Signup failed:", error.message);
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
                </form>

                {/* <p className="custom-paragraph">
                    Already have an account?{" "}
                    <button
                        onClick={() => {
                            handleOpenLogin();
                            handleCloseSignup();
                        }}
                    >
                        Login
                    </button>
                    <LoginModal
                        isLoginOpen={isLoginOpen}
                        handleCloseLogin={handleCloseLogin}
                    />
                </p> */}
            </div>
        </div>
    );
};

export default Signup;
