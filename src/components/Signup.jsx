import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
    FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Toast } from "./ui/toast";
import { useUserContext } from "../UserContext";
import { toast } from "./ui/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// const FormSchema = z.object({
//     username: z.string().min(1, "Please enter a username"),
//     email: z.string().email("Please enter a valid email"),
//     password: z.string().min(8, "Password must be at least 8 characters"),
// });

const Signup = ({ handleAuthModal, handleAuth }) => {
    const navigate = useNavigate();
    const { login } = useUserContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/users/signup",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            if (response.status === 409) {
                // Signup failed due to conflict (e.g., duplicate email or username)
                const errorData = await response.json();
                alert(errorData.error);
                console.error("Signup failed:", errorData.error);
            } else if (response.ok) {
                const userData = await response.json();
                login(userData.username);
                handleAuthModal();
                handleAuth();
                navigate("/program");
            } else {
                console.error("Signup failed:", response.statusText);
            }
        } catch (error) {
            console.error("Signup failed:", error.message);
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

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <div className="space-y-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                {...register("username", {
                                    required: "Please enter a username",
                                })}
                                name="username"
                                placeholder="Enter username"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>
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

                        <Button type="submit" className="">
                            {" "}
                            Signup{" "}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;
