import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
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

const Login = ({ handleAuthModal, handleAuth }) => {
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
                handleAuthModal();
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
        <div className="w-full h-full">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>
                        If you already have an account, login here
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email id"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            id="password"
                            placeholder="Enter password"
                            type="password"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSubmit}>Login</Button>
                </CardFooter>
            </Card>

            {/* <form
                className="flex flex-col items-center justify-center col-span-5 space-y-4"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-center">Login</h2>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="w-full px-4 py-2 text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                    type="submit"
                >
                    Log In
                </button>
            </form> */}
        </div>
    );
};

export default Login;
