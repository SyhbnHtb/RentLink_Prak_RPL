import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock check for existing session
    const storedUser = localStorage.getItem("rentlink_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("rentlink_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // In the future, this will be an API call:
    // const response = await axios.post("/api/login", { username, password });
    // setUser(response.data.user);
    
    // Mock implementation
    const mockUser = {
      username: username || "Xianyinks",
      name: "XianyinksDelEsol User_Email@ddress",
      email: "user@example.com",
      role: username?.toLowerCase() === "admin" ? "admin" : "user",
    };
    
    setUser(mockUser);
    localStorage.setItem("rentlink_user", JSON.stringify(mockUser));
    
    if (mockUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/group-user");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rentlink_user");
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
