import AdminSidebar from "./AdminSidebar";

/**
 * AdminLayout
 *
 * Layout wrapper yang menggabungkan AdminSidebar + area konten utama.
 * Semua halaman admin cukup membungkus kontennya dengan komponen ini.
 *
 * Props:
 * - `title`    – judul halaman yang ditampilkan di bagian atas konten
 * - `userName` – diteruskan ke AdminSidebar
 * - `onLogout` – diteruskan ke AdminSidebar
 * - `children` – konten halaman (JSX apapun)
 *
 * Contoh penggunaan:
 * ```jsx
 * export default function DashboardAdmin() {
 *   return (
 *     <AdminLayout title="Selamat Datang Kembali, Xianyinks!">
 *       <div>...konten dashboard...</div>
 *     </AdminLayout>
 *   );
 * }
 * ```
 */
export default function AdminLayout({
  title = "Selamat Datang Kembali, Xianyinks!",
  userName,
  onLogout,
  children,
}) {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="inline-flex justify-center items-start bg-[#FFF] w-[1920px] h-full absolute left-0 top-0 overflow-hidden">
        {/* ── Sidebar ── */}
        <AdminSidebar userName={userName} onLogout={onLogout} />

        {/* ── Area konten utama ── */}
        <div className="flex min-w-[1580.426px] pt-[43px] pr-[43px] pb-[43px] pl-[37px] flex-col items-start gap-[31px] bg-[#FFF] h-full absolute left-[340px] top-0 overflow-hidden">
          {/* Judul halaman */}
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-[34px] font-semibold w-fit">
              {title}
            </p>
          </div>

          {/* Konten halaman */}
          {children}
        </div>
      </div>
    </div>
  );
}
