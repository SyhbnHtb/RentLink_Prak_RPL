import { PersonIcon } from "./icons";

/**
 * UserCard
 *
 * Komponen kartu profil pengguna untuk ditampilkan di sidebar, side panel, dll.
 * Menampilkan avatar, nama lengkap, dan username.
 *
 * Props:
 * - `name`     - Nama lengkap pengguna (contoh: "Nasir")
 * - `username` - Username pengguna (contoh: "KingNasir")
 * - `className`- Class tambahan untuk root element
 */
export default function UserCard({ name, username, className = "" }) {
  return (
    <div
      className={`flex py-[15px] px-[22px] items-center gap-[15px] rounded-[12.3px] bg-[#B0E4CC] w-full h-[81px] ${className}`}
    >
      <div className="flex justify-center items-center rounded-[29.3px] bg-[#408A71] w-[59px] h-[59px]">
        <PersonIcon size={31} fill="#C5D9EA" />
      </div>
      <div className="flex flex-col items-start w-fit">
        <div className="flex flex-col items-start w-full">
          <p className="text-[#285A48] font-plusJakartaSans text-xl font-semibold w-fit">
            {name}
          </p>
        </div>
        <div className="flex flex-col items-start w-full">
          <p className="text-[#408A71] font-plusJakartaSans text-base font-bold w-fit">
            {username}
          </p>
        </div>
      </div>
    </div>
  );
}
