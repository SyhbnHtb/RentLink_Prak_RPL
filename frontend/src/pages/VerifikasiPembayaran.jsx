import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import Modal from "../components/Modal";
import StatusBadge from "../components/StatusBadge";
import * as tagService from "../services/tagService";
import { toast } from "react-hot-toast";

export default function VerifikasiPembayaran() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifikasiList, setVerifikasiList] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPembayaran = async () => {
    setIsLoading(true);
    try {
      const data = await tagService.getPembayaran();
      // Mengambil tagihan yang statusnya "Menunggu Konfirmasi" atau "Approved" untuk ditampilkan
      const filtered = data.filter(
        (t) => t.status === "Menunggu Konfirmasi" || t.status === "Approved" || t.status === "Ditolak"
      );
      setVerifikasiList(filtered);
    } catch (error) {
      console.error("Gagal mengambil data verifikasi", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPembayaran();
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
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleApprove = async () => {
    if (!selectedInvoice) return;
    setIsLoading(true);
    try {
      await tagService.approveTagihan(selectedInvoice.id);
      toast.success(`Pembayaran ${selectedInvoice.penyewa} berhasil di-approve!`);
      await fetchPembayaran();
      closeModal();
    } catch (error) {
      console.error("Gagal approve tagihan", error);
      toast.error("Gagal meng-approve tagihan.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisapprove = async () => {
    if (!selectedInvoice) return;
    setIsLoading(true);
    try {
      await tagService.disapproveTagihan(selectedInvoice.id);
      toast.success(`Pembayaran ${selectedInvoice.penyewa} ditolak.`);
      await fetchPembayaran();
      closeModal();
    } catch (error) {
      console.error("Gagal disapprove tagihan", error);
      toast.error("Gagal menolak tagihan.");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredList = verifikasiList.filter(v => 
    v.penyewa?.toLowerCase().includes(search.toLowerCase()) || 
    v.id?.toString().includes(search) ||
    v.namaUnit?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Verifikasi Pembayaran">
      <div className="flex flex-col gap-8 w-full max-w-[1600px] items-start relative">
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* Top Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Cari Invoice, Penyewa, Unit..." 
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Status</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pending Verifikasi...</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

            </div>
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Upload</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {filteredList.map((inv, index) => (
                    <tr key={inv.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{inv.id}</td>
                      <td className="py-4 px-6 text-gray-800">{inv.penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{inv.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(inv.total)}</td>
                      <td className="py-4 px-6 text-gray-800">{formatTanggal(inv.tanggal)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant={inv.status} />
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => openModal(inv)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Review</button>
                      </td>
                    </tr>
                  ))}
                  {filteredList.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500 font-medium">Tidak ada data untuk diverifikasi.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Review Bukti Bayar Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedInvoice && (
          <div className="bg-surface p-6 flex flex-col gap-6 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
            <h2 className="text-2xl font-bold text-primary mb-0">Review Bukti Bayar</h2>

            {/* Detail Invoice */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl">
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <span className="text-secondary font-bold text-xl">{selectedInvoice.penyewa?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-primary font-bold text-xl">{selectedInvoice.penyewa}</h3>
                  <p className="text-primary/70 text-sm">{selectedInvoice.namaUnit}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">INV-ID</span>
                  <span className="text-primary font-bold text-lg">{selectedInvoice.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Total</span>
                  <span className="text-primary font-bold text-lg">{formatRupiah(selectedInvoice.total)}</span>
                </div>
              </div>

              {/* Pratinjau Bukti Bayar */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Bukti Pembayaran</span>
                {selectedInvoice.bukti ? (
                  <div className="w-full rounded-xl overflow-hidden border border-gray-200">
                    <img 
                      src={`http://localhost:5001${selectedInvoice.bukti}`} 
                      alt="Bukti Bayar" 
                      className="w-full h-auto object-contain max-h-64"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x300?text=Bukti+Tidak+Ditemukan";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                      <span className="text-sm font-medium">Pratinjau Bukti Transfer</span>
                    </div>
                  </div>
                )}
              </div>

              <a 
                href={`http://localhost:5001${selectedInvoice.bukti}`} 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-primary font-bold rounded-xl transition-colors cursor-pointer text-center block"
              >
                Lihat Ukuran Penuh
              </a>
            </div>

            {/* Action Buttons */}
            {selectedInvoice.status === "Menunggu Konfirmasi" ? (
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={handleApprove} 
                  disabled={isLoading}
                  className="flex-1 py-3 bg-success hover:bg-green-700 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Proses..." : "Approve"}
                </button>
                <button 
                  onClick={handleDisapprove} 
                  disabled={isLoading}
                  className="flex-1 py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Proses..." : "Disapprove"}
                </button>
              </div>
            ) : (
              <div className="flex justify-center pt-4 border-t border-gray-100">
                <StatusBadge variant={selectedInvoice.status} />
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
