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

// Daftar akun mock yang terdaftar
const MOCK_ACCOUNTS = [
  { username: "admin",  password: "admin123",  name: "Admin",  email: "admin@rentlink.com",  role: "admin" },
  { username: "nasir",  password: "nasir123",  name: "Nasir",  email: "nasir@rentlink.com",  role: "user"  },
  { username: "rusdi",  password: "rusdi123",  name: "Rusdi",  email: "rusdi@rentlink.com",  role: "user"  },
];

  const login = async (username, password) => {
    // In the future, this will be an API call:
    // const response = await axios.post("/api/login", { username, password });
    
    // Cari akun yang cocok dengan username dan password
    const found = MOCK_ACCOUNTS.find(
      (acc) =>
        acc.username.toLowerCase() === username?.toLowerCase() &&
        acc.password === password
    );

    if (!found) {
      return { success: false, message: "Username atau password salah." };
    }

    const mockUser = {
      username: found.username,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    setUser(mockUser);
    localStorage.setItem("rentlink_user", JSON.stringify(mockUser));

    if (mockUser.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/group-user");
    }

    return { success: true };
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
