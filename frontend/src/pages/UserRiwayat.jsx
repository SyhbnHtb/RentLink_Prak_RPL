import UserLayout from "../components/UserLayout";
import StatusBadge from "../components/StatusBadge";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_TAGIHAN } from "../utils/mockData";

export default function UserRiwayat() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";
  const [selectedRiwayat, setSelectedRiwayat] = useState(null);

  // Riwayat = tagihan yang sudah Approved / Selesai
  const riwayat = MOCK_TAGIHAN.filter(
    (t) =>
      t.penyewa === userName &&
      (t.status === "Approved" || t.status === "Selesai")
  );

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const totalDibayar = riwayat.reduce((sum, t) => sum + (t.total || 0), 0);

  return (
    <UserLayout title="Riwayat Pembayaran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
              <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                Total Transaksi
              </p>
              <p className="text-gray-900 font-sans text-3xl font-bold">
                {riwayat.length}
              </p>
            </div>
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
              <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                Total Sudah Dibayar
              </p>
              <p className="text-gray-900 font-sans text-2xl font-bold">
                {formatRupiah(totalDibayar)}
              </p>
            </div>
          </div>

          {/* Tabel Riwayat */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-gray-900 font-sans text-xl font-bold">
                Riwayat Transaksi
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-base">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      ID Invoice
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      Nama Unit
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      Tanggal Dibayar
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      Total
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">
                      Status
                    </th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {riwayat.length > 0 ? (
                    riwayat.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 !== 0 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-gray-800 font-medium">
                          {item.id}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {item.namaUnit}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {formatTanggal(item.tglDibayar)}
                        </td>
                        <td className="py-4 px-6 text-gray-800 font-semibold">
                          {formatRupiah(item.total)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge variant="Selesai" />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => setSelectedRiwayat(item)}
                            className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer"
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-8 text-center text-gray-500 font-medium"
                      >
                        Belum ada riwayat pembayaran.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {selectedRiwayat && (
          <div className="w-full xl:w-80 shrink-0">
            <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-5 relative">
              <button
                onClick={() => setSelectedRiwayat(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer leading-none"
              >
                ×
              </button>
              <h3 className="text-primary font-bold text-xl mt-2">
                Detail Pembayaran
              </h3>

              <div className="flex items-center gap-3 bg-secondary/20 p-4 rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold text-lg">
                    {selectedRiwayat.namaUnit.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-primary font-bold">
                    {selectedRiwayat.namaUnit}
                  </p>
                  <p className="text-primary/60 text-sm">
                    {selectedRiwayat.bulan}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">ID Invoice</span>
                  <span className="text-gray-900 font-bold">
                    {selectedRiwayat.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">
                    Tanggal Dibayar
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {formatTanggal(selectedRiwayat.tglDibayar)}
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kamar</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedRiwayat.kamar)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Listrik</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedRiwayat.listrik)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Air</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedRiwayat.air)}
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-primary">Total</span>
                  <span className="text-primary">
                    {formatRupiah(selectedRiwayat.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-green-700 font-medium text-sm">
                  Pembayaran Selesai
                </span>
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
