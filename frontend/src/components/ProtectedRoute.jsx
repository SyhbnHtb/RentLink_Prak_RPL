import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * ProtectedRoute
 *
 * Wrapper untuk route yang memerlukan autentikasi.
 * - Jika user belum login, redirect ke /login
 * - Jika `role` di-specify, cek apakah user memiliki role yang sesuai
 *
 * Props:
 * - `children` - Komponen yang akan dirender jika authorized
 * - `role`     - (opsional) "admin" atau "user". Jika tidak diberikan, hanya cek login.
 *
 * Contoh penggunaan:
 * <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardAdmin /></ProtectedRoute>} />
 */
export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Belum login → redirect ke login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Cek role jika diminta
  if (role && user.role !== role) {
    // Admin yang mencoba akses halaman user → redirect ke /admin
    // User yang mencoba akses halaman admin → redirect ke /group-user
    const fallback = user.role === "admin" ? "/admin" : "/group-user";
    return <Navigate to={fallback} replace />;
  }

  return children;
}
