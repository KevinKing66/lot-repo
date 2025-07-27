import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useAuthenticatedWebSocket } from "../hooks/useAuthenticateWebSocket";

export const useAuth = () => {
    useAuthenticatedWebSocket();
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};
