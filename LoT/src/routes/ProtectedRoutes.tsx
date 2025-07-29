import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useAuth } from "../hooks/auth/useAuth";



const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;