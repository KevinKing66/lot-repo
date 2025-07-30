import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";
import HeaderComponents from "../../shared/components/headers";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { Login } from "../../features/auth/pages/Login";
import { AlertsPage } from "../../features/sensors/pages/Alerts";
import { MapsPage } from "../../features/sensors/pages/Maps";
import { Dashboard } from "../../features/sensors/pages/Dashboard";

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            {!isAuthenticated && <Login />}

            {isAuthenticated && <HeaderComponents />}
            <Routes>
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/maps" element={<ProtectedRoute><MapsPage /></ProtectedRoute>} />
                <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
                <Route path="/*" element={<ProtectedRoute><Navigate to="/" replace /></ProtectedRoute>} />
            </Routes>

        </Router>
    );
};

export default AppRoutes;