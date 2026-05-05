import { Routes, Route, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import VerificationPage from './pages/VerificationPage'
import GroupUser from './pages/GroupUser'
import DashboardAdmin from './pages/DashboardAdmin'
import ManagementUnit from './pages/ManagementUnit'
import ManajemenKontrak from './pages/ManajemenKontrak'
import ManajemenMeteran from './pages/ManajemenMeteran'
import TagihanPebayaran from './pages/TagihanPebayaran'
import RiwayatPembayaran from './pages/RiwayatPembayaran'
import ManajemenPenyewa from './pages/ManajemenPenyewa'
import VerifikasiPembayaran from './pages/VerifikasiPembayaran'
import LaporanKeuangan from './pages/LaporanKeuangan'
import UploadBuktiPembayaran from './pages/UploadBuktiPembayaran'
import ProfilPengguna from './pages/ProfilPengguna'
import UserTagihan from './pages/UserTagihan'
import UserRiwayat from './pages/UserRiwayat'
import UserMeteran from './pages/UserMeteran'
import UserKontrak from './pages/UserKontrak'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verification" element={<VerificationPage />} />

      {/* Admin Routes — hanya bisa diakses role "admin" */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardAdmin /></ProtectedRoute>} />
      <Route path="/admin/unit" element={<ProtectedRoute role="admin"><ManagementUnit /></ProtectedRoute>} />
      <Route path="/admin/kontrak" element={<ProtectedRoute role="admin"><ManajemenKontrak /></ProtectedRoute>} />
      <Route path="/admin/meteran" element={<ProtectedRoute role="admin"><ManajemenMeteran /></ProtectedRoute>} />
      <Route path="/admin/tagihan" element={<ProtectedRoute role="admin"><TagihanPebayaran /></ProtectedRoute>} />
      <Route path="/admin/riwayat" element={<ProtectedRoute role="admin"><RiwayatPembayaran /></ProtectedRoute>} />
      <Route path="/admin/penyewa" element={<ProtectedRoute role="admin"><ManajemenPenyewa /></ProtectedRoute>} />
      <Route path="/admin/verifikasi" element={<ProtectedRoute role="admin"><VerifikasiPembayaran /></ProtectedRoute>} />
      <Route path="/admin/laporan" element={<ProtectedRoute role="admin"><LaporanKeuangan /></ProtectedRoute>} />

      {/* User Routes — hanya bisa diakses role "user" */}
      <Route path="/group-user" element={<ProtectedRoute role="user"><GroupUser /></ProtectedRoute>} />
      <Route path="/group-user/tagihan" element={<ProtectedRoute role="user"><UserTagihan /></ProtectedRoute>} />
      <Route path="/group-user/riwayat" element={<ProtectedRoute role="user"><UserRiwayat /></ProtectedRoute>} />
      <Route path="/group-user/meteran" element={<ProtectedRoute role="user"><UserMeteran /></ProtectedRoute>} />
      <Route path="/group-user/kontrak" element={<ProtectedRoute role="user"><UserKontrak /></ProtectedRoute>} />
      <Route path="/user/upload-bukti" element={<ProtectedRoute role="user"><UploadBuktiPembayaran /></ProtectedRoute>} />

      {/* Shared Routes — bisa diakses admin maupun user */}
      <Route path="/profil" element={<ProtectedRoute><ProfilPengguna /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
