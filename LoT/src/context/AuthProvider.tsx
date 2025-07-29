import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useToken } from "../hooks/auth/useToken";
import type { AuthPayload } from "../types/AuthPayload";
import { decodeJwt } from "../utils/jwt-utils";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useToken();
    const [user, setUser] = useState<AuthPayload | null>(null);

    const login = async (email: string, password: string) => {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error('El correo electrónico y/o la contraseña son incorrectos');
        }

        const data = await res.json();
        setToken(data.token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };
    
    useEffect(() => {
        setIsAuthenticated(!!token);

        if (token) {
            try {
                const decoded = decodeJwt<AuthPayload>(token);
                setUser(decoded);
            } catch (err) {
                console.error("Error decoding token:", err);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ login, logout, isAuthenticated, token, user }}>
            {children}
        </AuthContext.Provider>
    );
};