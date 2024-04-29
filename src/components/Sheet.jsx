import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";

export function SheetDemo(handleAuth) {
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const handleOpenSignup = () => setIsSignupOpen(true);
    const handleCloseSignup = () => setIsSignupOpen(false);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);

    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>
                        <Menu />
                    </Button>
                </SheetTrigger>
                <SheetContent className="text-white border-none bg-grey-800">
                    <SheetHeader> Welcome </SheetHeader>
                    <button
                        className="text-white hover:text-gray-300"
                        onClick={() => {
                            <SheetClose />;
                            handleOpenLogin();
                        }}
                    >
                        Login
                    </button>
                    <button
                        className="text-white hover:text-gray-300"
                        onClick={() => {
                            <SheetClose />;
                            handleOpenSignup();
                        }}
                    >
                        Signup
                    </button>

                    <SheetFooter> </SheetFooter>
                </SheetContent>
            </Sheet>
            <LoginModal
                isLoginOpen={isLoginOpen}
                handleCloseLogin={handleCloseLogin}
                handleAuth={handleAuth}
            />
            <SignupModal
                isSignupOpen={isSignupOpen}
                handleCloseSignup={handleCloseSignup}
            />
        </div>
    );
}
