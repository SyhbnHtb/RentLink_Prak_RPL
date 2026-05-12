import UserLayout from "../components/UserLayout";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_METERAN } from "../utils/mockData";

export default function UserMeteran() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";

  // Filter data meteran milik user yang login
  const userMeteran = MOCK_METERAN.filter((m) => m.penyewa === userName);
  const meteran = userMeteran[0] || null;

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <UserLayout title="Data Meteran">
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {meteran ? (
          <>
            {/* Unit Info */}
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
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
                  <h2 className="text-gray-900 font-bold text-2xl">
                    {meteran.namaUnit}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Lantai {meteran.lantai} · ID: {meteran.id}
                  </p>
                </div>
              </div>

              {/* Readings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {/* Listrik */}
                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-yellow-700 font-semibold text-sm uppercase tracking-wider">
                      Listrik
                    </span>
                  </div>
                  <p className="text-gray-900 font-bold text-3xl">
                    {meteran.listrik !== null ? `${meteran.listrik}` : "-"}
                    <span className="text-gray-500 font-medium text-base ml-1">
                      kWh
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">Pemakaian bulan ini</p>
                </div>

                {/* Air */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">
                      Air
                    </span>
                  </div>
                  <p className="text-gray-900 font-bold text-3xl">
                    {meteran.air !== null ? `${meteran.air}` : "-"}
                    <span className="text-gray-500 font-medium text-base ml-1">
                      m³
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">Pemakaian bulan ini</p>
                </div>

                {/* Total Biaya */}
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">
                      Estimasi Biaya
                    </span>
                  </div>
                  <p className="text-gray-900 font-bold text-2xl">
                    {formatRupiah(meteran.total)}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Listrik + Air bulan ini
                  </p>
                </div>
              </div>
            </div>

            {/* Info Catatan */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-blue-800 font-semibold text-sm">
                  Informasi Meteran
                </p>
                <p className="text-blue-600 text-sm mt-1">
                  Data pemakaian diperbarui setiap awal bulan oleh admin.
                  Biaya meteran akan ditagihkan bersama dengan tagihan sewa
                  bulanan Anda.
                </p>
              </div>
            </div>
          </>
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">
              Tidak ada data meteran ditemukan.
            </p>
            <p className="text-gray-400 text-sm">
              Hubungi admin jika kamu merasa ada masalah.
            </p>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
