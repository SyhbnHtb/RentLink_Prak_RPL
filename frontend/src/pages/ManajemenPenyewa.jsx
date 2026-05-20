import { useState, useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import Modal from "../components/Modal";
import { toast } from "react-hot-toast";
import * as userService from "../services/userService";
import api from "../services/api";

export default function ManajemenPenyewa() {
  const [penyewaList, setPenyewaList] = useState([]);
  const [filteredPenyewa, setFilteredPenyewa] = useState([]);
  const [selectedPenyewa, setSelectedPenyewa] = useState(null);
  const [modalType, setModalType] = useState(null); // 'detail', 'delete', 'create', 'edit'
  const [isLoading, setIsLoading] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("");

  // Form state for create/edit
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formKtp, setFormKtp] = useState("");
  const [formAsal, setFormAsal] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const fetchPenyewa = async () => {
    setIsLoading(true);
    try {
      const data = await userService.getPenyewa();
      setPenyewaList(data || []);
      setFilteredPenyewa(data || []);
    } catch (e) {
      console.error("Gagal mengambil data penyewa", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPenyewa();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      setFilteredPenyewa(penyewaList.filter(p => 
        p.name.toLowerCase().includes(lower) || 
        p.email.toLowerCase().includes(lower) ||
        (p.unit && p.unit.toLowerCase().includes(lower))
      ));
    } else {
      setFilteredPenyewa(penyewaList);
    }
  }, [searchQuery, penyewaList]);

  const openModal = (penyewa, type) => {
    setSelectedPenyewa(penyewa);
    setModalType(type);
    if (type === "edit" && penyewa) {
      setFormName(penyewa.name || "");
      setFormEmail(penyewa.email || "");
      setFormPhone(penyewa.telepon === "-" ? "" : penyewa.telepon || "");
      setFormKtp(penyewa.ktp === "-" ? "" : penyewa.ktp || "");
      setFormAsal(penyewa.asal === "-" ? "" : penyewa.asal || "");
      setFormPassword("");
    }
  };

  const openCreateModal = () => {
    setSelectedPenyewa(null);
    setModalType("create");
    setFormName("");
    setFormEmail("");
    setFormPhone("");
    setFormKtp("");
    setFormAsal("");
    setFormPassword("");
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedPenyewa(null);
  };

  const handleDelete = async () => {
    if (!selectedPenyewa) return;
    
    setIsLoading(true);
    try {
      await userService.deletePenyewa(selectedPenyewa.id_user);
      toast.success("Penyewa berhasil dihapus");
      await fetchPenyewa();
      closeModal();
    } catch (e) {
      console.error("Gagal menghapus penyewa", e);
      toast.error("Gagal menghapus penyewa");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formName || !formEmail || !formPassword) {
      toast.error("Nama, email, dan password wajib diisi");
      return;
    }
    setIsLoading(true);
    try {
      await api.post('/penyewa', {
        name: formName,
        email: formEmail,
        password: formPassword,
        phone: formPhone || null,
      });
      toast.success("Penyewa berhasil ditambahkan");
      await fetchPenyewa();
      closeModal();
    } catch (e) {
      const msg = e.response?.data?.message || "Gagal menambahkan penyewa";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedPenyewa || !formName || !formEmail) {
      toast.error("Nama dan email wajib diisi");
      return;
    }
    setIsLoading(true);
    try {
      await api.put(`/penyewa/${selectedPenyewa.id_user}`, {
        name: formName,
        email: formEmail,
        phone: formPhone || null,
        ktp: formKtp || null,
        asal: formAsal || null,
      });
      toast.success("Data penyewa berhasil diperbarui");
      await fetchPenyewa();
      closeModal();
    } catch (e) {
      const msg = e.response?.data?.message || "Gagal memperbarui penyewa";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout title="Manajemen Penyewa">
      <div className="flex flex-col gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex flex-col gap-8 w-full">
          
          {/* Top Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            <div className="flex-1 grid grid-cols-1 gap-4">
              
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input 
                    type="text" 
                    placeholder="Cari Penyewa (Nama, Email, Unit)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" 
                  />
                </div>
              </div>

            </div>

            {/* Tambah Penyewa Button */}
            <button 
              onClick={openCreateModal}
              disabled={isLoading}
              className="w-full md:w-auto h-full min-h-[76px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group disabled:opacity-50"
            >
              <span className="text-primary font-sans text-xl font-bold group-hover:scale-105 transition-transform">+ Tambah Penyewa</span>
            </button>
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Email</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">No. KTP</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Telepon</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {filteredPenyewa.length > 0 ? filteredPenyewa.map((penyewa, index) => (
                    <tr key={penyewa.id_user} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{penyewa.name}</td>
                      <td className="py-4 px-6 text-gray-800">{penyewa.email}</td>
                      <td className="py-4 px-6 text-gray-800">{penyewa.ktp}</td>
                      <td className="py-4 px-6 text-gray-800">{penyewa.telepon}</td>
                      <td className="py-4 px-6 text-gray-800">{penyewa.unit}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${penyewa.status === "Aktif" ? "bg-success" : "bg-gray-400"}`}>
                          {penyewa.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button onClick={() => openModal(penyewa, 'detail')} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                        <button onClick={() => openModal(penyewa, 'edit')} className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer">Edit</button>
                        <button onClick={() => openModal(penyewa, 'delete')} className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500 font-medium">Tidak ada penyewa yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Penyewa Modal */}
      <Modal isOpen={modalType === 'detail'} onClose={closeModal}>
        {selectedPenyewa && (
          <div className="bg-surface p-6 flex flex-col gap-4 relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
            <h2 className="text-2xl font-bold text-primary mb-2">Detail Penyewa</h2>
            
            <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-xl">{selectedPenyewa.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary font-bold text-xl">{selectedPenyewa.name}</h3>
                <p className="text-primary/70 text-sm font-bold">Penyewa</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email</span>
                <span className="text-primary font-semibold text-sm break-all">{selectedPenyewa.email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Asal</span>
                <span className="text-primary font-semibold text-sm">{selectedPenyewa.asal}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">KTP</span>
                <span className="text-primary font-semibold text-sm">{selectedPenyewa.ktp}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Telepon</span>
                <span className="text-primary font-semibold text-sm">{selectedPenyewa.telepon}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                <span className="text-primary font-semibold text-sm">{selectedPenyewa.unit}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Status</span>
                <span className={`text-sm font-semibold ${selectedPenyewa.status === "Aktif" ? "text-green-600" : "text-gray-500"}`}>{selectedPenyewa.status}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Create / Edit Penyewa Modal */}
      <Modal isOpen={modalType === 'create' || modalType === 'edit'} onClose={closeModal}>
        <div className="bg-surface p-6 flex flex-col gap-4 relative">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
          <h2 className="text-2xl font-bold text-primary mb-2">{modalType === "create" ? "Tambah Penyewa Baru" : "Edit Penyewa"}</h2>

          <div className="flex flex-col gap-2">
            <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama *</label>
            <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nama lengkap" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email *</label>
            <input type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@contoh.com" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          {modalType === "create" && (
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Password *</label>
              <input type="password" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} placeholder="Minimal 6 karakter" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">No. Telepon</label>
            <input type="text" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          {modalType === "edit" && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">No. KTP</label>
                <input type="text" value={formKtp} onChange={(e) => setFormKtp(e.target.value)} placeholder="Nomor KTP" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Asal Daerah</label>
                <input type="text" value={formAsal} onChange={(e) => setFormAsal(e.target.value)} placeholder="Kota asal" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </>
          )}

          <div className="flex gap-3 mt-2">
            <button onClick={closeModal} disabled={isLoading} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">Batal</button>
            <button onClick={modalType === "create" ? handleCreate : handleEdit} disabled={isLoading} className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">
              {isLoading ? "Menyimpan..." : (modalType === "create" ? "Tambah" : "Simpan")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Hapus Confirmation Modal */}
      <Modal isOpen={modalType === 'delete'} onClose={closeModal} className="max-w-sm mx-auto">
        {selectedPenyewa && (
          <div className="bg-surface p-6 flex flex-col gap-4 text-center relative">
            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer">×</button>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#DC3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
            </div>
            <h2 className="text-gray-900 font-bold text-xl mb-1">Hapus Penyewa?</h2>
            <p className="text-gray-500 text-sm mb-4">Anda yakin ingin menghapus <strong>{selectedPenyewa.name}</strong>?</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleDelete} disabled={isLoading} className="w-full py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">
                {isLoading ? "Menghapus..." : "Ya, Hapus"}
              </button>
              <button onClick={closeModal} disabled={isLoading} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-full transition-colors cursor-pointer disabled:opacity-50">
                Batal
              </button>
            </div>
          </div>
        )}
      </Modal>
    </AdminLayout>
  );
}
