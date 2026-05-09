import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import Modal from "./Modal";

/**
 * AdminLayout
 *
 * Layout wrapper yang menggabungkan AdminSidebar + area konten utama.
 * Semua halaman admin cukup membungkus kontennya dengan komponen ini.
 */
export default function AdminLayout({
  title = "Selamat Datang Kembali, Admin!",
  children,
}) {
  const { user, logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  // Ambil nama user dari context, default ke "Admin" jika belum ada
  const displayUserName = user?.name || "Admin";

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar userName={displayUserName} onLogout={() => setIsLogoutModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-primary font-bold text-3xl md:text-[34px] tracking-wide">
              {title}
            </h1>
          </div>

          {/* Page Content */}
          <div className="w-full">
            {children}
          </div>

        </main>
      </div>

      {/* Modal Konfirmasi Logout */}
      <Modal isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)}>
        <div className="bg-surface p-8 flex flex-col gap-6 items-center text-center relative max-w-sm w-full mx-auto">
          <div className="w-16 h-16 bg-red-50 text-danger rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Logout</h3>
            <p className="text-gray-500">Apakah Anda yakin ingin keluar dari aplikasi?</p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button 
              onClick={handleConfirmLogout}
              className="flex-1 py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer"
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
