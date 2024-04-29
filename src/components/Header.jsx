import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { SheetDemo } from "./Sheet";

const Header = () => {
    const navigate = useNavigate();

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
        // window.location.reload();
    };

    return (
        <nav className="sticky top-0 backdrop-blur-lg">
            <div className="flex items-center justify-between w-full px-4 py-4 mx-auto sm:px-6 lg:px-8">
                <div className="flex-shrink-0">
                    <h3 className="text-xl">
                        <Link to="/">LNM-Program-Dashboard</Link>
                    </h3>
                </div>
                <div className="flex space-x-4">
                    {isAuth ? (
                        <button
                            className="text-white hover:text-gray-300"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    ) : (
                        <SheetDemo handleAuth={handleAuth} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
