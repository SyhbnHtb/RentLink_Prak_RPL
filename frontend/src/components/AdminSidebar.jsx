import { Link, useLocation } from "react-router-dom";
import { PersonIcon, DashboardIcon, DocumentIcon } from "./icons";

/**
 * Menu items untuk sidebar admin.
 * `icon` menentukan jenis ikon yang dipakai.
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
 *
 * Sidebar navigasi untuk semua halaman admin.
 * Menu yang aktif ditentukan otomatis berdasarkan URL saat ini (useLocation).
 *
 * Props:
 * - `userName`  – nama atau email yang ditampilkan di profil (opsional)
 * - `onLogout`  – fungsi yang dipanggil saat tombol Logout ditekan (opsional)
 */
export default function AdminSidebar({
  userName = "XianyinksDelEsol User_Email@ddress",
  onLogout,
}) {
  const location = useLocation();

  return (
    <div className="flex min-h-[926.112px] flex-col items-start bg-linear-[180deg,#285A480%,#091413100%] w-[340px] h-full absolute left-0 top-0">
      {/* ── Header: judul dashboard ── */}
      <div className="flex pt-[43px] pr-[37px] pb-[31px] pl-[37px] flex-col items-start w-full">
        <p className="text-[#FFF] font-sora text-[31px] font-semibold w-full tracking-[0.01em]">
          Dashboard
        </p>
      </div>

      {/* ── Profil user ── */}
      <div className="flex py-0 px-3 flex-col items-start w-full">
        <div className="flex pt-[19px] pr-[25px] pb-[31px] pl-[25px] items-center gap-[15px] border-b-[1.54px] border-b-[rgba(255,255,255,0.12)] w-full">
          <div className="flex justify-center items-center rounded-[29.3px] bg-[#408A71] w-[59px] h-[59px]">
            <PersonIcon size={31} fill="#B0E4CC" />
          </div>
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#408A71] font-plusJakartaSans text-[15px] w-fit">
              {userName}
            </p>
          </div>
        </div>
      </div>

      {/* ── Menu navigasi ── */}
      <div className="flex py-[25px] px-3 flex-col items-start gap-1.5 w-[340px]">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const iconFill = isActive ? "#B0E4CC" : "#B0E4CC";
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

        {/* ── Tombol Logout ── */}
        <button
          onClick={onLogout}
          className="cursor-pointer text-nowrap flex py-[9px] px-[22px] flex-col justify-center items-center rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.22)] w-[315px] mt-2"
        >
          <p className="text-[#FFF] font-arial text-xl font-bold w-fit">
            Logout
          </p>
        </button>
      </div>
    </div>
  );
}
