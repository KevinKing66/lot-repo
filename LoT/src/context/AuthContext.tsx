import { createContext } from "react";
import type { AuthPayload } from "../types/AuthPayload";

export type AuthContextType = {
    token: null | string;
    isAuthenticated: boolean;
    user: AuthPayload | null;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    login: (email: string, password: string) => {
        if (email.length > 0 && password.length > 0) console.log("no se cumple las validaciones")
    },
    logout: () => { }
};

export const AuthContext = createContext<AuthContextType | undefined>(initialState);

