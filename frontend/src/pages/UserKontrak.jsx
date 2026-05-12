import UserLayout from "../components/UserLayout";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_KONTRAK } from "../utils/mockData";

export default function UserKontrak() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";

  // Filter kontrak milik user yang login
  const userKontrak = MOCK_KONTRAK.filter((k) => k.penyewa === userName);
  const kontrakAktif = userKontrak.find((k) => k.status === "Aktif");

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const hitungSisaHari = (tglSelesai) => {
    if (!tglSelesai) return null;
    const today = new Date();
    const end = new Date(tglSelesai);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <UserLayout title="Kontrak Saya">
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {/* Kontrak Aktif */}
        {kontrakAktif ? (
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-900 font-bold text-2xl">Kontrak Aktif</h2>
              <StatusBadge variant="Aktif" />
            </div>

            {/* Unit Info */}
            <div className="flex items-center gap-4 bg-primary/5 rounded-2xl p-5">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                <svg
                  className="w-8 h-8 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-primary font-bold text-xl">
                  {kontrakAktif.namaUnit}
                </h3>
                <p className="text-gray-500 text-sm">
                  Lantai {kontrakAktif.lantai} · ID Kontrak: {kontrakAktif.id}
                </p>
              </div>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Tanggal Mulai
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  {formatTanggal(kontrakAktif.tglMulai)}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Tanggal Selesai
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  {formatTanggal(kontrakAktif.tglSelesai)}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Penyewa
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  {kontrakAktif.penyewa}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                  Sisa Kontrak
                </span>
                <span className="text-gray-900 font-bold text-lg">
                  {(() => {
                    const sisa = hitungSisaHari(kontrakAktif.tglSelesai);
                    if (sisa === null) return "-";
                    if (sisa < 0) return "Sudah berakhir";
                    if (sisa === 0) return "Berakhir hari ini";
                    return `${sisa} hari lagi`;
                  })()}
                </span>
              </div>
            </div>

            {/* Data Penyewa */}
            {kontrakAktif.penyewaDetail && (
              <div className="border-t border-gray-100 pt-6 flex flex-col gap-4">
                <h3 className="text-gray-700 font-bold text-base uppercase tracking-wider">
                  Informasi Penyewa
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-medium">Email</span>
                    <span className="text-gray-900 font-semibold">
                      {kontrakAktif.penyewaDetail.email}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-medium">No. Telepon</span>
                    <span className="text-gray-900 font-semibold">
                      {kontrakAktif.penyewaDetail.telp}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-medium">Asal Daerah</span>
                    <span className="text-gray-900 font-semibold">
                      {kontrakAktif.penyewaDetail.asal}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-xs font-medium">No. KTP</span>
                    <span className="text-gray-900 font-semibold">
                      {kontrakAktif.penyewaDetail.ktp}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-12 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              Tidak ada kontrak aktif saat ini.
            </p>
            <p className="text-gray-400 text-sm">
              Hubungi admin untuk informasi lebih lanjut.
            </p>
          </div>
        )}

        {/* Riwayat Kontrak */}
        {userKontrak.filter((k) => k.status !== "Aktif").length > 0 && (
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-gray-900 font-bold text-xl">
                Riwayat Kontrak
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-base">
                    <th className="py-4 px-6 font-medium">ID</th>
                    <th className="py-4 px-6 font-medium">Unit</th>
                    <th className="py-4 px-6 font-medium">Tanggal Mulai</th>
                    <th className="py-4 px-6 font-medium">Tanggal Selesai</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {userKontrak
                    .filter((k) => k.status !== "Aktif")
                    .map((kontrak, index) => (
                      <tr
                        key={kontrak.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 !== 0 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-gray-800 font-medium">
                          {kontrak.id}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {kontrak.namaUnit}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {formatTanggal(kontrak.tglMulai)}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {formatTanggal(kontrak.tglSelesai)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge variant={kontrak.status} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
