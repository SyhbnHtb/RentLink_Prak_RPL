import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../contexts/AuthContext";

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
  
  // Ambil nama user dari context, default ke "Admin" jika belum ada
  const displayUserName = user?.name || "Admin";
  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar userName={displayUserName} onLogout={logout} />

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
    </div>
  );
}
