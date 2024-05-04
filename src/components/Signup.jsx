import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUserContext } from "../UserContext";

const Signup = ({ handleAuthModal, handleAuth }) => {
    const navigate = useNavigate();
    const { login } = useUserContext();
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
                alert(errorData.error);
                console.error("Signup failed:", errorData.error);
            } else if (response.ok) {
                console.log("Signup successful!");
                const userData = await response.json();
                // close the auth modal
                login(userData.username);
                handleAuthModal();
                handleAuth();
                navigate("/program");
            } else {
                console.error("Signup failed:", response.statusText);
                // TODO: Handle other errors appropriately, e.g., display an error message to the user.
            }
        } catch (error) {
            console.error("Signup failed:", error.message);
            // TODO: Handle errors appropriately, e.g., display an error message to the user.
        }
    };

    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription>
                        If you don't have an account, register here
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email id"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            minLenght={8}
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Signup</Button>
                </CardFooter>
            </Card>
            {/* <div className="custom-content">
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

                <p className="custom-paragraph">
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
                </p>
            </div> */}
        </div>
    );
};

export default Signup;
