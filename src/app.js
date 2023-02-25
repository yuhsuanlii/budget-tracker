import React from "react";
import { Routes, Route } from "react-router-dom";
import { BudgetTrackerProvider } from "./hooks/useBudgetTracker";
import KeeperPage from "./pages/keeperPage";
import TrackerPage from "./pages/trackerPage";
import ChartPage from "./pages/chartPage";
import UserPage from "./pages/userPage";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";

const App = () => {
    return (
        <BudgetTrackerProvider>
            <Routes>
                <Route path="/" element={<Navbar />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/keeper" element={<KeeperPage />} />
                <Route path="/tracker" element={<TrackerPage />} />
                <Route path="/chart" element={<ChartPage />} />
                <Route path="/logout" element={<LoginForm />} />
            </Routes>
        </BudgetTrackerProvider>
    )
}

export default App;