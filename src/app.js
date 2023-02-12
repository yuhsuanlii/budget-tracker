import React from "react";
import { Routes, Route } from "react-router-dom";
import { BudgetTrackerProvider } from "./hooks/useBudgetTracker";
import KeeperPage from "./pages/keeperPage";
import TrackerPage from "./pages/trackerPage";
import Navbar from "./components/navbar";

const App = () => {
    return (
        <BudgetTrackerProvider>
            <Routes>
                <Route path="/" element={<KeeperPage />} />
                <Route path="/user" element={<Navbar />} />
                <Route path="/keeper" element={<KeeperPage />} />
                <Route path="/tracker" element={<TrackerPage />} />
                <Route path="/chart" element={<Navbar />} />
                <Route path="/logout" element={<Navbar />} />
            </Routes>
        </BudgetTrackerProvider>
    )
}

export default App;