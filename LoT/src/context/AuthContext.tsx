import { createContext } from "react";

export type AuthContextType = {
    token: null | string;
    isAuthenticated: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
};

const initialState = {
    token: null,
    isAuthenticated: false,
    login: (email: string, password: string) => {
        if (email.length > 0 && password.length > 0) console.log("no se cumple las validaciones")
    },
    logout: () => { }
};

export const AuthContext = createContext<AuthContextType | undefined>(initialState);

