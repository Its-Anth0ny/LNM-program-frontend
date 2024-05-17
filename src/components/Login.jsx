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
import { useForm } from "react-hook-form";

const Login = ({ handleAuthModal, handleAuth }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { login } = useUserContext();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/login",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
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
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                {...register("email", {
                                    required: "Please enter valid email id",
                                })}
                                name="email"
                                type="email"
                                placeholder="Enter email id"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                {...register("password", {
                                    required: "Please enter a password",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                                name="password"
                                type="password"
                                placeholder="Enter password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button type="submit"> Login </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
