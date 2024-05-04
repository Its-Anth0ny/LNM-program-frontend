// import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    // SheetDescription,
    SheetFooter,
    SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "./ui/sheet";

export function SheetDemo(props) {
    const { isAuth, handleAuth, handleAuthModal } = props;
    return (
        <div>
            <Sheet className="">
                <SheetTrigger asChild>
                    <div>
                        <Button className="dark:bg-transparent md:hidden">
                            <Menu className="dark:text-white" />
                        </Button>
                    </div>
                </SheetTrigger>
                <SheetContent className="text-white border-none">
                    <SheetHeader> Welcome </SheetHeader>
                    <button
                        className="text-white hover:text-gray-300 "
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
        </div>
    );
}
