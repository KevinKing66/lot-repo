import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useToken } from "../hooks/useToken";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useToken();

    const login = async (email: string, password: string) => {
        const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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
    };
    
    useEffect(() => {
        setIsAuthenticated(!!token);
    }, [isAuthenticated, token])

    return (<AuthContext.Provider value={{ login, logout, isAuthenticated, token }}> {children} </AuthContext.Provider>);
};