import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import * as tagService from "../services/tagService";

export default function LaporanKeuangan() {
  const { data, filters, handleFilterChange, sortConfig, handleSort, setData } =
    useTableFilter([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tagihanList, setTagihanList] = useState([]);

  useEffect(() => {
    const fetchTagihan = async () => {
      setIsLoading(true);
      try {
        const tagihanData = await tagService.getTagihan();
        setTagihanList(tagihanData || []);
        setData(tagihanData || []);
      } catch (error) {
        console.error("Gagal mengambil tagihan", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTagihan();
  }, [setData]);

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

  // Hitung summary dari tagihanList
  const totalPemasukan = tagihanList.filter(
    (t) => t.status === "Approved" || t.status === "Selesai" || t.status === "lunas"
  ).reduce((sum, t) => sum + (t.total || 0), 0);

  const totalBelumLunas = tagihanList.filter(
    (t) => t.status === "Belum Bayar" || t.status === "belum" || t.status === "Menunggu Konfirmasi"
  ).reduce((sum, t) => sum + (t.total || 0), 0);

  const totalUnitAktif = new Set(
    tagihanList.map((t) => t.namaUnit)
  ).size;

  const totalSelesai = tagihanList.filter(
    (t) => t.status === "Approved" || t.status === "Selesai" || t.status === "lunas"
  ).length;

  return (
    <AdminLayout title="Laporan Keuangan">
      <div className="flex flex-col gap-10 w-full max-w-7xl relative">

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
              Total Pemasukan
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {formatRupiah(totalPemasukan)}
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
              Tagihan Belum Lunas
            </p>
            <p className="text-danger font-sans text-3xl font-bold">
              {formatRupiah(totalBelumLunas)}
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
              Total Unit Tertagih
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {totalUnitAktif}
            </p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">
              Pembayaran Selesai
            </p>
            <p className="text-success font-sans text-3xl font-bold">
              {totalSelesai}
            </p>
          </div>
        </div>

        {/* Tabel Riwayat Transaksi */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Riwayat Transaksi
          </h2>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FilterControl
              label="Tahun"
              placeholder="Pilih Tahun..."
              type="select"
              value={filters.tahun}
              onChange={(val) => handleFilterChange("tahun", val)}
              options={["All", "2024", "2025", "2026"]}
            />
            <FilterControl
              label="Bulan"
              placeholder="Pilih Bulan..."
              type="select"
              value={filters.bulan}
              onChange={(val) => handleFilterChange("bulan", val)}
              options={[
                "All",
                "Januari",
                "Februari",
                "Maret",
                "April",
                "Mei",
                "Juni",
                "Juli",
                "Agustus",
                "September",
                "Oktober",
                "November",
                "Desember",
              ]}
            />
            <FilterControl
              label="Status"
              placeholder="Pilih Status..."
              type="select"
              value={filters.status}
              onChange={(val) => handleFilterChange("status", val)}
              options={["All", "Belum Bayar", "Menunggu Konfirmasi", "Approved"]}
            />
            <FilterControl
              label="Search"
              placeholder="Cari transaksi..."
              type="search"
              value={filters.search}
              onChange={(val) => handleFilterChange("search", val)}
            />
          </div>

          {/* Sort + Table */}
          <div className="flex justify-end">
            <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-3 flex items-center gap-3 relative">
              <span className="text-primary font-sans text-sm font-medium uppercase tracking-wide">
                Sort:
              </span>
              <div
                className="bg-gray-100 rounded-full px-4 py-1.5 flex items-center gap-2 cursor-pointer"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <span className="text-gray-600 font-sans text-sm font-medium">
                  {sortConfig.key
                    ? `${sortConfig.key} (${sortConfig.direction})`
                    : "Urutkan..."}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {isSortDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-sans font-medium"
                    onClick={() => {
                      handleSort("total");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Total Pembayaran
                  </div>
                  <div
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-sans font-medium"
                    onClick={() => {
                      handleSort("tglDibayar");
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    Tanggal Dibayar
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 !== 0 ? "bg-gray-50/50" : ""
                        }`}
                      >
                        <td className="py-4 px-6 text-gray-800">{item.id}</td>
                        <td className="py-4 px-6 text-gray-800">{item.penyewa}</td>
                        <td className="py-4 px-6 text-gray-800">{item.namaUnit}</td>
                        <td className="py-4 px-6 text-gray-800">
                          {formatTanggal(item.tglDibayar)}
                        </td>
                        <td className="py-4 px-6 text-gray-800 font-semibold">
                          {formatRupiah(item.total)}
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge variant={item.status} />
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => setSelectedItem(item)}
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
                        colSpan="7"
                        className="py-8 text-center text-gray-500 font-medium"
                      >
                        Tidak ada transaksi ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
          <div className="bg-surface p-6 flex flex-col gap-6 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-primary mb-0">Detail Transaksi</h2>

            <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl mt-2">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-xl">
                  {selectedItem.penyewa?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary font-bold text-xl">{selectedItem.penyewa}</h3>
                <p className="text-primary/70 text-sm">{selectedItem.namaUnit}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">
                  INV-ID
                </span>
                <span className="text-primary font-bold text-lg">{selectedItem.id}</span>
              </div>

              <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 mt-2">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider mb-2">
                  Biaya Sewa
                </span>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Periode</span>
                  <span>{selectedItem.periode || 30} hari</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Kamar</span>
                  <span>{formatRupiah(selectedItem.kamar)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Listrik</span>
                  <span>{formatRupiah(selectedItem.listrik)}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Air</span>
                  <span>{formatRupiah(selectedItem.air)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary mt-2 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span>{formatRupiah(selectedItem.total)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-2">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">
                  Status
                </span>
                <StatusBadge variant={selectedItem.status} />
              </div>

              <div className="flex flex-col gap-1 border-t border-gray-100 pt-4">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">
                  Tanggal
                </span>
                <span className="text-primary font-bold text-lg">
                  {formatTanggal(selectedItem.tglDibayar)}
                </span>
              </div>
            </div>

          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
