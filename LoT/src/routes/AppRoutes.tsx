import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";
import { MapsPage } from "../pages/Maps";
import ProtectedRoute from "./ProtectedRoutes";
import HeaderComponents from "../component/headers";

const AppRoutes: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            {!isAuthenticated && <Login />}

            {isAuthenticated && <HeaderComponents />}
            <Routes>
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/maps" element={<ProtectedRoute><MapsPage /></ProtectedRoute>} />
                <Route path="/*" element={<ProtectedRoute><Navigate to="/" replace /></ProtectedRoute>} />
            </Routes>

        </Router>
    );
};

export default AppRoutes;