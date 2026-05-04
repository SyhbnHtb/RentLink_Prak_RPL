import UserLayout from "../components/UserLayout";
import StatusBadge from "../components/StatusBadge";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_TAGIHAN } from "../utils/mockData";
import { Link } from "react-router-dom";

export default function UserTagihan() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";
  const [selectedTagihan, setSelectedTagihan] = useState(null);

  // Filter hanya tagihan milik user yg login
  const userTagihan = MOCK_TAGIHAN.filter((t) => t.penyewa === userName);
  const activeTagihan = userTagihan.filter(
    (t) => t.status !== "Approved" && t.status !== "Selesai"
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

  return (
    <UserLayout title="Tagihan Saya">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        {/* Tabel Tagihan */}
        <div className="flex-1 flex flex-col gap-6 w-full">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
              <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                Total Tagihan Aktif
              </p>
              <p className="text-gray-900 font-sans text-3xl font-bold">
                {activeTagihan.length}
              </p>
            </div>
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
              <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                Jumlah Harus Dibayar
              </p>
              <p className="text-gray-900 font-sans text-2xl font-bold">
                {formatRupiah(
                  activeTagihan.reduce((sum, t) => sum + (t.total || 0), 0)
                )}
              </p>
            </div>
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
              <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                Status Terkini
              </p>
              <div className="mt-1">
                {activeTagihan[0] ? (
                  <StatusBadge variant={activeTagihan[0].status} />
                ) : (
                  <StatusBadge variant="Selesai" />
                )}
              </div>
            </div>
          </div>

          {/* Tabel */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-gray-900 font-sans text-xl font-bold">
                Daftar Tagihan Aktif
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
                      Periode
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
                  {userTagihan.length > 0 ? (
                    userTagihan.map((tagihan, index) => (
                      <tr
                        key={tagihan.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 !== 0 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-gray-800 font-medium">
                          {tagihan.id}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {tagihan.namaUnit}
                        </td>
                        <td className="py-4 px-6 text-gray-800">
                          {tagihan.bulan} ({tagihan.periode} hari)
                        </td>
                        <td className="py-4 px-6 text-gray-800 font-semibold">
                          {formatRupiah(tagihan.total)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge variant={tagihan.status} />
                        </td>
                        <td className="py-4 px-6 text-center space-x-3">
                          <button
                            onClick={() => setSelectedTagihan(tagihan)}
                            className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer"
                          >
                            Detail
                          </button>
                          {tagihan.status === "Belum Bayar" && (
                            <Link
                              to="/user/upload-bukti"
                              className="text-blue-500 hover:text-blue-700 font-medium transition-colors"
                            >
                              Bayar
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-8 text-center text-gray-500 font-medium"
                      >
                        Tidak ada tagihan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel Detail */}
        {selectedTagihan && (
          <div className="w-full xl:w-80 shrink-0">
            <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-5 relative">
              <button
                onClick={() => setSelectedTagihan(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer leading-none"
              >
                ×
              </button>
              <h3 className="text-primary font-bold text-xl mt-2">
                Detail Tagihan
              </h3>

              <div className="flex items-center gap-3 bg-secondary/20 p-4 rounded-2xl">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold text-lg">
                    {selectedTagihan.namaUnit.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-primary font-bold">
                    {selectedTagihan.namaUnit}
                  </p>
                  <p className="text-primary/60 text-sm">
                    {selectedTagihan.bulan}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">ID Invoice</span>
                  <span className="text-gray-900 font-bold">
                    {selectedTagihan.id}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Periode</span>
                  <span className="text-gray-900 font-semibold">
                    {selectedTagihan.periode} hari
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Kamar</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedTagihan.kamar)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Listrik</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedTagihan.listrik)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Air</span>
                  <span className="text-gray-900">
                    {formatRupiah(selectedTagihan.air)}
                  </span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-primary">Total</span>
                  <span className="text-primary">
                    {formatRupiah(selectedTagihan.total)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <StatusBadge variant={selectedTagihan.status} />
                </div>
              </div>

              {selectedTagihan.status === "Belum Bayar" && (
                <Link
                  to="/user/upload-bukti"
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors text-center text-sm"
                >
                  Upload Bukti Pembayaran
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
