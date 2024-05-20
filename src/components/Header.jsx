import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../modals/AuthModal";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
// import { SheetDemo } from "./Sheet";

const Header = () => {
    const navigate = useNavigate();

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const handleAuthModal = () => setIsAuthModalOpen(!isAuthModalOpen);

    const [isAuth, setIsAuth] = useState(false);
    const handleAuth = () => setIsAuth(true);

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3000/api/users/logout", {
                method: "GET",
                credentials: "include",
            });
        } catch (error) {
            console.error("Error during logout:", error);
        }
        navigate("/");
        setIsAuth(false);
        window.location.reload();
    };

    return (
        <nav className="sticky top-0 bg-gray-600 bg-opacity-25 backdrop-blur-lg">
            <div className="flex items-center justify-between w-full px-4 py-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex-shrink-0">
                    <h3 className="text-xl font-semibold">
                        <Link to="/">LNM-Program-Dashboard</Link>
                    </h3>
                </div>
                <div className="flex space-x-4">
                    {isAuth ? (
                        <div className="flex gap-4">
                            <Button onClick={() => navigate("/program")}>
                                Dashboard
                            </Button>
                            <Button onClick={handleLogout}>Logout</Button>
                            <ModeToggle />
                        </div>
                    ) : (
                        <div>
                            {/* <SheetDemo
                                isAuthModalOpen={isAuthModalOpen}
                                handleAuthModal={handleAuthModal}
                                isAuth={isAuth}
                                handleAuth={handleAuth}
                            /> */}
                            <div className="flex gap-4 max-md:hidden">
                                <Button className="" onClick={handleAuthModal}>
                                    Login/Signup
                                </Button>
                                <Button className="max-md:hidden">
                                    Contact Us
                                </Button>
                                <ModeToggle />
                            </div>
                            <AuthModal
                                isAuthModalOpen={isAuthModalOpen}
                                handleAuthModal={handleAuthModal}
                                isAuth={isAuth}
                                handleAuth={handleAuth}
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
