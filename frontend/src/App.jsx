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

function App() {
  return (
    <Routes>
      {/* Redirect root langsung ke halaman login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/group-user" element={<GroupUser />} />
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/admin/unit" element={<ManagementUnit />} />
      <Route path="/admin/kontrak" element={<ManajemenKontrak />} />
      <Route path="/admin/meteran" element={<ManajemenMeteran />} />
      <Route path="/admin/tagihan" element={<TagihanPebayaran />} />
      <Route path="/admin/riwayat" element={<RiwayatPembayaran />} />
    </Routes>
  )
}

export default App
