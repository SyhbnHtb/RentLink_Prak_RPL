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
    label: "Meteran",
    path: "/group-user/meteran",
    icon: "dashboard",
  },
  {
    label: "Kontrak",
    path: "/group-user/kontrak",
    icon: "document",
  },
  {
    label: "Biodata",
    path: "/group-user/biodata",
    icon: "dashboard",
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
}) {
  const location = useLocation();

  return (
    <div className="flex min-h-[926.112px] flex-col items-start bg-linear-[180deg,#285A480%,#091413100%] w-[340px] h-full absolute left-0 top-0">
      {/* ── Header: judul dashboard ── */}
      <div className="flex pt-[43px] pr-[37px] pb-[31px] pl-[37px] flex-col items-start w-full">
        <p className="text-[#FFF] font-sora text-[31px] font-semibold w-full tracking-[0.01em]">
          RentLink
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
      </div>
    </div>
  );
}
