import UserSidebar from "./UserSidebar";
import { useAuth } from "../contexts/AuthContext";

/**
 * UserLayout
 *
 * Layout wrapper untuk halaman user/penyewa.
 * Menggunakan UserSidebar (bukan AdminSidebar) dengan menu khusus penyewa.
 */
export default function UserLayout({ title, children }) {
  const { user, logout } = useAuth();
  const displayUserName = user?.name || "Penyewa";
  const displayTitle = title || `Selamat Datang, ${displayUserName}!`;

  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Sidebar Penyewa */}
      <UserSidebar userName={displayUserName} onLogout={logout} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-primary font-bold text-3xl md:text-[34px] tracking-wide">
              {displayTitle}
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
