import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("rentlink_user");
    const accessToken = localStorage.getItem("rentlink_access_token");
    if (storedUser && accessToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("rentlink_user");
        localStorage.removeItem("rentlink_access_token");
        localStorage.removeItem("rentlink_refresh_token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (!result.success) {
      return { success: false, message: result.message };
    }

    const { id_user, name, role, accessToken, refreshToken } = result.data;
    
    // Store user info and tokens
    const loggedUser = { id_user, name, email: result.data.email, role };
    setUser(loggedUser);
    localStorage.setItem("rentlink_user", JSON.stringify(loggedUser));
    localStorage.setItem("rentlink_access_token", accessToken);
    localStorage.setItem("rentlink_refresh_token", refreshToken);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/group-user");
    }

    return { success: true };
  };

  const logout = async () => {
    // Call backend to invalidate refresh token
    await authService.logout();
    
    // Clear local state
    setUser(null);
    localStorage.removeItem("rentlink_user");
    localStorage.removeItem("rentlink_access_token");
    localStorage.removeItem("rentlink_refresh_token");
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
