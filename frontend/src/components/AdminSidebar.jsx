import { Link, useLocation } from "react-router-dom";
import { PersonIcon, DashboardIcon, DocumentIcon } from "./icons";

/**
 * Menu items untuk sidebar admin.
 */
const MENU_ITEMS = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: "dashboard",
  },
  {
    label: "Manajemen Unit",
    path: "/admin/unit",
    icon: "dashboard",
  },
  {
    label: "Manajemen Kontrak",
    path: "/admin/kontrak",
    icon: "dashboard",
  },
  {
    label: "Manajemen Meteran",
    path: "/admin/meteran",
    icon: "dashboard",
  },
  {
    label: "Tagihan & Pembayaran",
    path: "/admin/tagihan",
    icon: "document",
  },
  {
    label: "Riwayat Transaksi",
    path: "/admin/riwayat",
    icon: "document",
  },
];

/**
 * AdminSidebar
 */
export default function AdminSidebar({
  userName = "XianyinksDelEsol User_Email@ddress",
  onLogout,
}) {
  const location = useLocation();

  return (
    <aside className="w-[300px] lg:w-[320px] shrink-0 min-h-screen bg-primary flex flex-col shadow-xl z-20">
      {/* ── Header: judul dashboard ── */}
      <div className="px-10 py-10">
        <h2 className="text-white font-sans text-3xl font-bold tracking-wider">
          Dashboard
        </h2>
      </div>

      {/* ── Profil user ── */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-4 pb-6 border-b border-white/20">
          <div className="flex justify-center items-center rounded-full bg-secondary/80 w-14 h-14 shrink-0">
            <PersonIcon size={31} fill="#ffffff" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-secondary font-sans text-sm md:text-base truncate">
              {userName}
            </p>
          </div>
        </div>
      </div>

      {/* ── Menu navigasi ── */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors ${
                isActive 
                  ? "bg-white/10 text-secondary" 
                  : "text-secondary/70 hover:bg-white/5 hover:text-secondary"
              }`}
            >
              {item.icon === "dashboard" ? (
                <DashboardIcon
                  size={24}
                  fill={isActive ? "#B0E4CC" : "#B0E4CC"}
                  fillOpacity={isActive ? undefined : 0.7}
                />
              ) : (
                <DocumentIcon
                  size={24}
                  fill={isActive ? "#B0E4CC" : "#B0E4CC"}
                  fillOpacity={isActive ? undefined : 0.7}
                />
              )}
              <span className="font-sans text-lg font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Tombol Logout ── */}
      <div className="p-6 mb-4 mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex justify-center items-center py-4 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 transition-colors shadow-sm cursor-pointer"
        >
          <span className="text-white font-sans text-xl font-bold">
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
