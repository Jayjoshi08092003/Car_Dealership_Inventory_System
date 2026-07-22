import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!token) {
            setUser(null);
            return;
        }

        try {
            const decoded = jwtDecode(token);

            // Check if token has expired
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                logout();
                return;
            }

            setUser({
                email: decoded.sub,
                role: decoded.role,
            });

        } catch (err) {
            console.error("Invalid token:", err);
            logout();
        }
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token,
                // You MUST include this, or your ActionButtons will break
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}