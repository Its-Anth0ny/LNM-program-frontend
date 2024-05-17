import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ProgramsDashboard from "./pages/ProgramsDashboard";
import { UserContextProvider } from "./UserContext";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/theme-provider";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <UserContextProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <div className="p-0 m-0 font-poppins unshow-scroll">
                                    <Header />
                                    <Outlet />
                                    <Footer />
                                </div>
                            }
                        >
                            <Route path="/" element={<Welcome />} />
                            <Route
                                path="/program"
                                element={<ProgramsDashboard />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContextProvider>
        </ThemeProvider>
    );
}

export default App;
