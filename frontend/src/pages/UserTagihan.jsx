import UserLayout from "../components/UserLayout";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_TAGIHAN } from "../utils/mockData";

export default function UserTagihan() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";

  // Tab state: "aktif" | "riwayat"
  const [activeTab, setActiveTab] = useState("aktif");

  const [selectedTagihan, setSelectedTagihan] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const openDetailModal = (tagihan) => {
    setSelectedTagihan(tagihan);
    setIsDetailModalOpen(true);
  };

  const openUploadModal = (tagihan) => {
    setSelectedTagihan(tagihan);
    setIsUploadModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsUploadModalOpen(false);
    setSelectedTagihan(null);
  };

  // Filter data
  const userTagihan = MOCK_TAGIHAN.filter((t) => t.penyewa === userName);
  const activeTagihan = userTagihan.filter(
    (t) => t.status !== "Approved" && t.status !== "Selesai"
  );
  const riwayatTagihan = userTagihan.filter(
    (t) => t.status === "Approved" || t.status === "Selesai"
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

  const totalSudahDibayar = riwayatTagihan.reduce(
    (sum, t) => sum + (t.total || 0),
    0
  );

  return (
    <UserLayout title="Tagihan & Riwayat">
      <div className="flex flex-col gap-8 w-full max-w-[1600px] items-start">

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
              Tagihan Aktif
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
              Total Sudah Dibayar
            </p>
            <p className="text-gray-900 font-sans text-2xl font-bold">
              {formatRupiah(totalSudahDibayar)}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab("aktif")}
            className={`px-6 py-2.5 rounded-lg font-sans font-semibold text-sm transition-all cursor-pointer ${
              activeTab === "aktif"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tagihan Aktif
            {activeTagihan.length > 0 && (
              <span className="ml-2 bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {activeTagihan.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("riwayat")}
            className={`px-6 py-2.5 rounded-lg font-sans font-semibold text-sm transition-all cursor-pointer ${
              activeTab === "riwayat"
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Riwayat Pembayaran
            {riwayatTagihan.length > 0 && (
              <span className="ml-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {riwayatTagihan.length}
              </span>
            )}
          </button>
        </div>

        {/* ── TAB: Tagihan Aktif ── */}
        {activeTab === "aktif" && (
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden w-full">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-gray-900 font-sans text-xl font-bold">
                Daftar Tagihan Aktif
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-base">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Periode</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {activeTagihan.length > 0 ? (
                    activeTagihan.map((tagihan, index) => (
                      <tr
                        key={tagihan.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 !== 0 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-gray-800 font-medium">{tagihan.id}</td>
                        <td className="py-4 px-6 text-gray-800">{tagihan.namaUnit}</td>
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
                            onClick={() => openDetailModal(tagihan)}
                            className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer"
                          >
                            Detail
                          </button>
                          {tagihan.status === "Belum Bayar" && (
                            <button
                              onClick={() => openUploadModal(tagihan)}
                              className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                            >
                              Bayar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500 font-medium">
                        Tidak ada tagihan aktif. Semua pembayaran sudah selesai! 🎉
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB: Riwayat Pembayaran ── */}
        {activeTab === "riwayat" && (
          <div className="flex flex-col gap-4 w-full">
            {/* Summary Riwayat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
                <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                  Total Transaksi Selesai
                </p>
                <p className="text-gray-900 font-sans text-3xl font-bold">
                  {riwayatTagihan.length}
                </p>
              </div>
              <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
                <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
                  Total Sudah Dibayar
                </p>
                <p className="text-success font-sans text-2xl font-bold">
                  {formatRupiah(totalSudahDibayar)}
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
                      <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                      <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                      <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibayar</th>
                      <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                      <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                      <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-base">
                    {riwayatTagihan.length > 0 ? (
                      riwayatTagihan.map((item, index) => (
                        <tr
                          key={item.id}
                          className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                            index % 2 !== 0 ? "bg-gray-50/50" : ""
                          }`}
                        >
                          <td className="py-4 px-6 text-gray-800 font-medium">{item.id}</td>
                          <td className="py-4 px-6 text-gray-800">{item.namaUnit}</td>
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
                              onClick={() => openDetailModal(item)}
                              className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer"
                            >
                              Detail
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-gray-500 font-medium">
                          Belum ada riwayat pembayaran.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Detail Tagihan Modal */}
      <Modal isOpen={isDetailModalOpen} onClose={closeModal}>
        {selectedTagihan && (
          <div className="bg-surface p-6 flex flex-col gap-5 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer leading-none"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primary mb-0">
              {activeTab === "riwayat" ? "Detail Pembayaran" : "Detail Tagihan"}
            </h2>

            <div className="flex items-center gap-3 bg-secondary/20 p-4 rounded-2xl mt-2">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-lg">
                  {selectedTagihan.namaUnit.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-primary font-bold">{selectedTagihan.namaUnit}</p>
                <p className="text-primary/60 text-sm">{selectedTagihan.bulan}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium">ID Invoice</span>
                <span className="text-gray-900 font-bold">{selectedTagihan.id}</span>
              </div>
              {selectedTagihan.tglDibayar && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Tanggal Dibayar</span>
                  <span className="text-gray-900 font-semibold">
                    {formatTanggal(selectedTagihan.tglDibayar)}
                  </span>
                </div>
              )}
              {!selectedTagihan.tglDibayar && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 font-medium">Periode</span>
                  <span className="text-gray-900 font-semibold">
                    {selectedTagihan.periode} hari
                  </span>
                </div>
              )}
              <hr className="border-gray-100" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kamar</span>
                <span className="text-gray-900">{formatRupiah(selectedTagihan.kamar)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Listrik</span>
                <span className="text-gray-900">{formatRupiah(selectedTagihan.listrik)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Air</span>
                <span className="text-gray-900">{formatRupiah(selectedTagihan.air)}</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between font-bold text-base">
                <span className="text-primary">Total</span>
                <span className="text-primary">{formatRupiah(selectedTagihan.total)}</span>
              </div>
              <div className="flex justify-between text-sm items-center mt-1">
                <span className="text-gray-500">Status</span>
                <StatusBadge variant={selectedTagihan.status} />
              </div>
            </div>

            {/* Jika sudah selesai, tampilkan konfirmasi selesai */}
            {(selectedTagihan.status === "Approved" || selectedTagihan.status === "Selesai") && (
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl mt-2">
                <span className="text-green-700 font-medium text-sm">Pembayaran Selesai</span>
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {/* Tombol upload jika belum bayar */}
            {selectedTagihan.status === "Belum Bayar" && (
              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  setIsUploadModalOpen(true);
                }}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors text-center text-sm mt-2 cursor-pointer"
              >
                Upload Bukti Pembayaran
              </button>
            )}
          </div>
        )}
      </Modal>

      {/* Upload Bukti Modal */}
      <Modal isOpen={isUploadModalOpen} onClose={closeModal}>
        {selectedTagihan && (
          <div className="bg-surface p-6 flex flex-col gap-5 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer leading-none"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primary mb-0">
              Upload Bukti Transfer
            </h2>

            <div className="flex flex-col gap-1 mt-2">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">
                Total Pembayaran
              </span>
              <span className="text-primary font-bold text-2xl">
                {formatRupiah(selectedTagihan.total)}
              </span>
              <span className="text-gray-500 text-sm mt-1">
                Tagihan untuk <strong>{selectedTagihan.namaUnit}</strong> periode{" "}
                <strong>{selectedTagihan.bulan}</strong>
              </span>
            </div>

            {/* Drop Zone */}
            <div className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-secondary/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/10 transition-colors mt-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-primary/50"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="text-primary font-sans font-semibold text-sm">
                Choose File or Drag File
              </p>
              <p className="text-gray-400 text-xs">File Type: JPG, PNG, PDF</p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={closeModal}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer text-sm"
              >
                Batal
              </button>
              <button
                onClick={closeModal}
                className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer text-sm"
              >
                Kirim Bukti
              </button>
            </div>
          </div>
        )}
      </Modal>
    </UserLayout>
  );
}
