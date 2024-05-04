import Login from "./Login";
import Signup from "./Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function AuthTab({ handleAuthModal, handleAuth }) {
    return (
        <Tabs defaultValue="login" className="max-w-[400px] w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Login
                    handleAuthModal={handleAuthModal}
                    handleAuth={handleAuth}
                />
            </TabsContent>
            <TabsContent value="signup">
                <Signup
                    handleAuthModal={handleAuthModal}
                    handleAuth={handleAuth}
                />
            </TabsContent>
        </Tabs>
    );
}
