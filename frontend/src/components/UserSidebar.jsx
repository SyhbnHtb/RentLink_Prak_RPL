import { Link, useLocation } from "react-router-dom";
import { PersonIcon, DashboardIcon, DocumentIcon } from "./icons";

/**
 * Menu items untuk sidebar user (penyewa).
 */
const MENU_ITEMS = [
  {
    label: "Dashboard",
    path: "/group-user",
    icon: "dashboard",
  },
  {
    label: "Tagihan",
    path: "/group-user/tagihan",
    icon: "document",
  },
  {
    label: "Riwayat Pembayaran",
    path: "/group-user/riwayat",
    icon: "document",
  },
  {
    label: "Upload Bukti",
    path: "/user/upload-bukti",
    icon: "document",
  },
  {
    label: "Meteran",
    path: "/group-user/meteran",
    icon: "dashboard",
  },
  {
    label: "Kontrak",
    path: "/group-user/kontrak",
    icon: "document",
  },
];

/**
 * UserSidebar
 *
 * Sidebar navigasi untuk halaman user/penyewa (GroupUser, dll).
 * Serupa dengan AdminSidebar namun menu berbeda dan tanpa tombol Logout.
 * Menu aktif ditentukan otomatis berdasarkan URL saat ini (useLocation).
 *
 * Props:
 * - `userName`  – nama user yang ditampilkan di profil (opsional)
 */
export default function UserSidebar({
  userName = "Nasir",
  onLogout,
}) {
  const location = useLocation();

  return (
    <aside className="w-[300px] lg:w-[320px] shrink-0 min-h-screen flex flex-col bg-[radial-gradient(198.87%_100%_at_50%_0%,#091413_0%,#408A71_100%)] shadow-xl z-20">
      {/* ── Header: judul dashboard ── */}
      <div className="flex pt-[43px] pr-[37px] pb-[31px] pl-[37px] flex-col items-start w-full">
        <p className="text-[#FFF] font-sora text-[31px] font-semibold w-full tracking-[0.01em]">
          RentLink
        </p>
      </div>

      {/* ── Profil user ── */}
      <div className="px-6 mb-8">
        <Link 
          to="/profil"
          className="flex items-center gap-4 pb-6 border-b border-white/20 cursor-pointer hover:bg-white/5 rounded-2xl transition-colors p-2 -ml-2"
        >
          <div className="flex justify-center items-center rounded-full bg-[#408A71] w-14 h-14 shrink-0">
            <PersonIcon size={31} fill="#B0E4CC" />
          </div>
          <div className="flex flex-col min-w-0">
            <p className="text-[#408A71] font-plusJakartaSans text-sm md:text-base truncate font-semibold">
              {userName}
            </p>
            <p className="text-[#408A71]/70 font-sans text-xs mt-0.5">Lihat Profil</p>
          </div>
        </Link>
      </div>

      {/* ── Menu navigasi ── */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const iconFill = "#B0E4CC";
          const iconOpacity = isActive ? undefined : 0.7;
          const textColor = isActive
            ? "text-[#B0E4CC]"
            : "text-[rgba(176,228,204,0.70)]";
          const bgActive = isActive ? "bg-[rgba(255,255,255,0.10)]" : "";

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full ${bgActive}`}
            >
              {item.icon === "dashboard" ? (
                <DashboardIcon
                  size={25}
                  fill={iconFill}
                  fillOpacity={iconOpacity}
                />
              ) : item.icon === "person" ? (
                <PersonIcon
                  size={25}
                  fill={iconFill}
                  fillOpacity={iconOpacity}
                />
              ) : (
                <DocumentIcon
                  size={25}
                  fill={iconFill}
                  fillOpacity={iconOpacity}
                />
              )}
              <p className={`${textColor} font-plusJakartaSans text-xl font-medium w-fit`}>
                {item.label}
              </p>
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
          <span className="text-white font-sans text-xl font-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
}
