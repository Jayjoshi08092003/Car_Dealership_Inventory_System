import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        try {
            const response = await api.get("/users/me");
            setUser(response.data);
        } catch (error) {
            console.error(error);

            localStorage.removeItem("token");

            delete api.defaults.headers.common["Authorization"];

            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (token) => {
        localStorage.setItem("token", token);

        api.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        await loadUser();
    };

    const logout = () => {
        localStorage.removeItem("token");

        delete api.defaults.headers.common["Authorization"];

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                isAdmin: user?.role === "admin",
                login,
                logout,
                refreshUser: loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}