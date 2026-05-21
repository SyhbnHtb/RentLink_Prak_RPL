import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTableFilter } from "../hooks/useTableFilter";
import { toast } from "react-hot-toast";
import * as tagService from "../services/tagService";
import api from "../services/api";

export default function TagihanPebayaran() {
  const navigate = useNavigate();
  const { data, filters, handleFilterChange, setData, sortConfig, handleSort } = useTableFilter([]);
  const [selectedTagihan, setSelectedTagihan] = useState(null);
  const [actionType, setActionType] = useState(null); // 'detail', 'delete', 'generate'
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate form state
  const [genBulan, setGenBulan] = useState("");
  const [genTahun, setGenTahun] = useState(new Date().getFullYear().toString());
  const [isGenBulanOpen, setIsGenBulanOpen] = useState(false);
  const BULAN_LIST = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

  const fetchTagihan = async () => {
    setIsLoading(true);
    try {
      const tagihanList = await tagService.getTagihan();
      setData(tagihanList || []);
    } catch (e) {
      console.error("Gagal memuat tagihan", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTagihan();
  }, []);

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTanggal = (dateString) => {
    if (!dateString || dateString === "-") return "-";
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

  const confirmDelete = async () => {
    if (!selectedTagihan) return;
    setIsLoading(true);
    try {
      await tagService.deleteTagihan(selectedTagihan.id);
      await fetchTagihan();
      setActionType(null);
      setSelectedTagihan(null);
    } catch (e) {
      console.error("Gagal menghapus tagihan", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!genBulan || !genTahun) {
      toast.error("Pilih bulan dan tahun terlebih dahulu");
      return;
    }
    setIsLoading(true);
    try {
      const response = await api.post('/tagihan/generate', {
        bulan: genBulan,
        tahun: Number(genTahun)
      });
      if (response.data.success) {
        const hasil = response.data.data;
        const berhasil = hasil.hasilGenerate?.length || 0;
        const gagal = hasil.gagalGenerate?.length || 0;
        toast.success(`${berhasil} tagihan berhasil di-generate${gagal > 0 ? `, ${gagal} dilewati` : ''}`);
        await fetchTagihan();
        setActionType(null);
      }
    } catch (e) {
      const msg = e.response?.data?.message || "Gagal generate tagihan";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Tagihan & Pembayaran">
      <div className="flex flex-col gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex flex-col gap-8 w-full">
          
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
                  <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-sans font-medium" onClick={() => { handleSort("total"); setIsSortDropdownOpen(false); }}>Total Pembayaran</div>
                    <div className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-sans font-medium" onClick={() => { handleSort("tglDibayar"); setIsSortDropdownOpen(false); }}>Tanggal Dibayar</div>
                  </div>
                )}
            </div>
          </div>

          {/* Generate Tagihan Button */}
          <button 
            onClick={() => setActionType("generate")}
            disabled={isLoading}
            className="w-full md:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl transition-colors cursor-pointer disabled:opacity-50 shrink-0"
          >
            ⚡ Generate Tagihan
          </button>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibuat</th>
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
      </div>

      {/* Modal Detail / Delete */}
      <Modal isOpen={actionType !== null} onClose={() => { setActionType(null); setSelectedTagihan(null); }} className={actionType === "delete" ? "max-w-sm mx-auto" : ""}>
        {(actionType === "detail" || actionType === "delete") && selectedTagihan && (
          <div className="w-full flex flex-col gap-6 shrink-0">
            
            {/* Detail Card */}
            {actionType === "detail" && (
              <div className="bg-surface p-6 flex flex-col gap-6 relative">
                <button onClick={() => setActionType(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
                <h2 className="text-2xl font-bold text-primary mb-0">Detail Tagihan</h2>
                
                <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl mt-2">
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
                      <span>Periode</span>
                      <span>{selectedTagihan.periode}</span>
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

                  <div className="flex flex-col gap-1 mt-2 border-t border-gray-100 pt-4">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Dibayar Pada</span>
                    <span className="text-primary font-bold text-lg">{formatTanggal(selectedTagihan.tglDibayar)}</span>
                  </div>
                </div>

                {selectedTagihan.status === "Menunggu Konfirmasi" && (
                  <button
                    onClick={() => {
                      setActionType(null);
                      setSelectedTagihan(null);
                      navigate("/admin/verifikasi");
                    }}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Review & Verifikasi Bukti
                  </button>
                )}
              </div>
            )}

            {actionType === "delete" && (
              <div className="bg-surface p-6 flex flex-col gap-4 text-center relative">
                <button onClick={() => setActionType(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 mt-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                </div>
                <h2 className="text-gray-900 font-bold text-xl mb-1">Hapus Tagihan?</h2>
                <p className="text-gray-500 text-sm mb-4">Tagihan ini akan dihapus dan dipindahkan ke riwayat.</p>
                <div className="flex flex-col gap-3 w-full">
                  <button disabled={isLoading} onClick={confirmDelete} className="w-full py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">
                    {isLoading ? "Menghapus..." : "Ya, Hapus"}
                  </button>
                  <button disabled={isLoading} onClick={() => setActionType(null)} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">Batal</button>
                </div>
              </div>
            )}

          </div>
        )}
      </Modal>

      {/* Generate Tagihan Modal */}
      <Modal isOpen={actionType === "generate"} onClose={() => setActionType(null)}>
        <div className="bg-surface p-6 flex flex-col gap-5 relative">
          <button onClick={() => setActionType(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
          <h2 className="text-2xl font-bold text-primary">Generate Tagihan</h2>
          <p className="text-gray-500 text-sm -mt-2">Tagihan akan di-generate untuk semua kontrak aktif berdasarkan data meteran periode yang dipilih.</p>

          <div className="flex flex-col gap-2 relative">
            <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Bulan</label>
            <div onClick={() => setIsGenBulanOpen(!isGenBulanOpen)} className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer">
              <span className="text-gray-600 font-sans">{genBulan || "Pilih Bulan..."}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            {isGenBulanOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                {BULAN_LIST.map((b) => (
                  <div key={b} onClick={() => { setGenBulan(b); setIsGenBulanOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">{b}</div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tahun</label>
            <input type="number" value={genTahun} onChange={(e) => setGenTahun(e.target.value)} placeholder="2025" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={() => setActionType(null)} disabled={isLoading} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">Batal</button>
            <button onClick={handleGenerate} disabled={isLoading} className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>
      </Modal>

    </AdminLayout>
  );
}
