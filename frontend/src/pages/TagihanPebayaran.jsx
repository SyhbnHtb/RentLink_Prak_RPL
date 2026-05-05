import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import { useState } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import { MOCK_TAGIHAN } from "../utils/mockData";

export default function TagihanPebayaran() {
  const { data, filters, handleFilterChange, setData, sortConfig, handleSort } = useTableFilter(MOCK_TAGIHAN);
  const [selectedTagihan, setSelectedTagihan] = useState(null);
  const [actionType, setActionType] = useState(null); // 'detail', 'delete'
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

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
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const handleDetailClick = (tagihan) => {
    setSelectedTagihan(tagihan);
    setActionType("detail");
  };

  const handleDeleteClick = (tagihan) => {
    setSelectedTagihan(tagihan);
    setActionType("delete");
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== selectedTagihan.id));
    setActionType(null);
    setSelectedTagihan(null);
  };

  const handleApprove = () => {
    const updatedData = data.map(item => 
      item.id === selectedTagihan.id ? { ...item, status: "Approved" } : item
    );
    setData(updatedData);
    setActionType(null);
    setSelectedTagihan(null);
  };

  const handleDisapprove = () => {
    const updatedData = data.map(item => 
      item.id === selectedTagihan.id ? { ...item, status: "Belum Bayar", tglDibayar: null } : item
    );
    setData(updatedData);
    setActionType(null);
    setSelectedTagihan(null);
  };

  return (
    <AdminLayout title="Tagihan & Pembayaran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <FilterControl 
              label="Bulan" 
              placeholder="Pilih Bulan..." 
              type="select" 
              value={filters.bulan}
              onChange={(val) => handleFilterChange("bulan", val)}
              options={["All", "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]}
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
              placeholder="Cari Tagihan..." 
              type="search" 
              value={filters.search}
              onChange={(val) => handleFilterChange("search", val)}
            />

            <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2 relative">
              <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Sort</label>
              <div 
                className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <span className="text-gray-600 font-sans font-medium">
                  {sortConfig.key ? `${sortConfig.key} (${sortConfig.direction})` : "Urutkan..."}
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700" onClick={() => { handleSort("total"); setIsSortDropdownOpen(false); }}>Total Pembayaran</div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700" onClick={() => { handleSort("tglDibayar"); setIsSortDropdownOpen(false); }}>Tanggal Dibayar</div>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibayar</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? data.map((tagihan, index) => (
                    <tr key={tagihan.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{tagihan.id}</td>
                      <td className="py-4 px-6 text-gray-800">{tagihan.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{tagihan.penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{formatTanggal(tagihan.tglDibayar)}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(tagihan.total)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant={tagihan.status} />
                      </td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button onClick={() => handleDetailClick(tagihan)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                        <button onClick={() => handleDeleteClick(tagihan)} className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500 font-medium">Tidak ada tagihan yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Details & Actions) */}
        {(actionType === "detail" || actionType === "delete") && selectedTagihan && (
          <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
            
            {/* Detail Card */}
            {actionType === "detail" && (
              <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-6 relative">
                <button onClick={() => setActionType(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
                
                <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl mt-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <span className="text-secondary font-bold text-xl">{selectedTagihan.penyewa.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-primary font-bold text-xl">{selectedTagihan.penyewa}</h3>
                    <p className="text-primary/70 text-sm">Penyewa</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">INV-ID</span>
                    <span className="text-primary font-bold text-lg">{selectedTagihan.id}</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                    <span className="text-primary font-bold text-lg">{selectedTagihan.namaUnit}</span>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 mt-2">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider mb-2">Biaya Sewa</span>
                    <div className="flex justify-between text-sm font-semibold text-primary">
                      <span>Periode (hari)</span>
                      <span>{selectedTagihan.periode} hari</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-primary">
                      <span>Kamar</span>
                      <span>{formatRupiah(selectedTagihan.kamar)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-primary">
                      <span>Listrik</span>
                      <span>{formatRupiah(selectedTagihan.listrik)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-primary">
                      <span>Air</span>
                      <span>{formatRupiah(selectedTagihan.air)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-primary mt-2 border-t border-gray-100 pt-2">
                      <span>Total</span>
                      <span>{formatRupiah(selectedTagihan.total)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Dibayar Pada</span>
                    <span className="text-primary font-bold text-lg">{formatTanggal(selectedTagihan.tglDibayar)}</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-primary font-bold rounded-xl transition-colors mt-2 cursor-pointer">
                  Lihat Bukti Pembayaran
                </button>

                {selectedTagihan.status === "Belum Bayar" && (
                  <button 
                    onClick={handleApprove}
                    className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Approve
                  </button>
                )}
              </div>
            )}

            {/* Action Modals / Cards (Simulation) */}
            {actionType === "detail" && selectedTagihan.status === "Approved" && (
              <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-3">
                <button 
                  onClick={handleDisapprove}
                  className="w-full py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer"
                >
                  Batalkan Pembayaran
                </button>
              </div>
            )}

            {actionType === "delete" && (
              <ConfirmDialog 
                title="Hapus Tagihan? Tagihan akan masuk ke Riwayat"
                onConfirm={confirmDelete}
                onCancel={() => setActionType(null)}
              />
            )}

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
