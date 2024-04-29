import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ProgramsDashboard from "./pages/ProgramsDashboard";
import { UserContextProvider } from "./UserContext";
import Header from "./components/Header";
import Welcome from "./pages/Welcome";
import Footer from "./components/Footer";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="p-0 m-0 font-poppins">
                                <Header />
                                <Outlet />
                                <Footer />
                            </div>
                        }
                    >
                        <Route path="/" element={<Welcome />} />
                        <Route
                            path="/program"
                            element={<ProgramsDashboardContainer />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

function ProgramsDashboardContainer() {
    return (
        <div className="App">
            <ProgramsDashboard />
        </div>
    );
}

export default App;
