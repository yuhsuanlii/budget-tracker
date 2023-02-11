import React from "react";
import { Routes, Route } from "react-router-dom";
import { BudgetTrackerProvider } from "./hooks/useBudgetTracker";
import KeeperPage from "./pages/keeperPage";
import TrackerPage from "./pages/trackerPage";

const App = () => {
    return (
        <BudgetTrackerProvider>
            <Routes>
                <Route path="/" element={<KeeperPage />} />
                <Route path="/keeper" element={<KeeperPage />} />
                <Route path="/tracker" element={<TrackerPage />} />
            </Routes>
        </BudgetTrackerProvider>
    )
}

export default App;