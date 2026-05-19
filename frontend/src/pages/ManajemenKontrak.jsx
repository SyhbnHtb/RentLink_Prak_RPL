import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import { useState, useEffect } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import * as kontrakService from "../services/kontrakService";
import * as unitService from "../services/unitService";
import * as userService from "../services/userService";

export default function ManajemenKontrak() {
  const { data, filters, handleFilterChange, setData } = useTableFilter([]);
  const [selectedKontrak, setSelectedKontrak] = useState(null);
  const [actionType, setActionType] = useState(null); // 'create', 'detail'
  const [isLoading, setIsLoading] = useState(false);
  
  // Available units and users for dropdowns
  const [availableUnits, setAvailableUnits] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  
  // Form state for creating kontrak
  const [formUser, setFormUser] = useState("");
  const [formUnit, setFormUnit] = useState("");
  const [formTglMulai, setFormTglMulai] = useState("");
  const [formTglAkhir, setFormTglAkhir] = useState("");
  
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const fetchKontrak = async () => {
    setIsLoading(true);
    try {
      const kontraks = await kontrakService.getKontraks();
      setData(kontraks || []);
    } catch (error) {
      console.error("Gagal memuat kontrak", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const units = await unitService.getUnits();
      // Filter unit yang "Tersedia"
      setAvailableUnits(units.filter(u => u.status === 'Tersedia'));
      
      const users = await userService.getPenyewa();
      setAvailableUsers(users);
    } catch (e) {
      console.error("Gagal memuat data unit/user", e);
    }
  };

  useEffect(() => {
    fetchKontrak();
    fetchDropdownData();
  }, []);

  const handleDetailClick = (kontrak) => {
    setSelectedKontrak(kontrak);
    setActionType("detail");
  };

  const handleCreateClick = () => {
    setSelectedKontrak(null);
    setActionType("create");
    setFormUser("");
    setFormUnit("");
    setFormTglMulai(new Date().toISOString().split('T')[0]);
    
    // Default 1 tahun
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    setFormTglAkhir(nextYear.toISOString().split('T')[0]);
  };

  const handleSaveForm = async () => {
    if (!formUser || !formUnit || !formTglMulai || !formTglAkhir) return;
    
    setIsLoading(true);
    try {
      if (actionType === "create") {
        await kontrakService.createKontrak({
          user_id: formUser,
          unit_id: formUnit,
          tgl_mulai: formTglMulai,
          tgl_akhir: formTglAkhir
        });
        
        await fetchKontrak();
        await fetchDropdownData(); // refresh unit availability
      }
      
      setActionType(null);
      setFormUser("");
      setFormUnit("");
    } catch (e) {
      console.error("Gagal membuat kontrak", e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEndKontrak = async (id) => {
    setIsLoading(true);
    try {
      await kontrakService.endKontrak(id);
      await fetchKontrak();
      await fetchDropdownData();
    } catch (e) {
      console.error("Gagal mengakhiri kontrak", e);
    } finally {
      setIsLoading(false);
    }
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

  return (
    <AdminLayout title="Manajemen Kontrak">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Actions & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <FilterControl 
                label="Status" 
                placeholder="Pilih Status..." 
                type="select" 
                value={filters.status}
                onChange={(val) => handleFilterChange("status", val)}
                options={["All", "Aktif", "Selesai"]}
              />
              <FilterControl 
                label="Search" 
                placeholder="Cari Kontrak..." 
                type="search" 
                value={filters.search}
                onChange={(val) => handleFilterChange("search", val)}
              />
              <FilterControl 
                label="Lantai" 
                placeholder="Pilih Lantai..." 
                type="select" 
                value={filters.lantai}
                onChange={(val) => handleFilterChange("lantai", val)}
                options={["All", "1", "2"]}
              />
            </div>

            {/* Tambah Kontrak Button */}
            <button 
              onClick={handleCreateClick}
              disabled={isLoading}
              className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group disabled:opacity-50"
            >
              <span className="text-primary font-sans text-xl font-bold group-hover:scale-105 transition-transform">+ Buat Kontrak</span>
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
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Lantai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Mulai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Selesai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? data.map((kontrak, index) => (
                    <tr key={kontrak.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{kontrak.id}</td>
                      <td className="py-4 px-6 text-gray-800">{kontrak.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{kontrak.lantai}</td>
                      <td className="py-4 px-6 text-gray-800">{kontrak.penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{formatTanggal(kontrak.tglMulai)}</td>
                      <td className="py-4 px-6 text-gray-800">{formatTanggal(kontrak.tglSelesai)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant={kontrak.status} />
                      </td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button onClick={() => handleDetailClick(kontrak)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                        {kontrak.status === "Aktif" && (
                          <button onClick={() => handleEndKontrak(kontrak.id)} className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Akhiri</button>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-gray-500 font-medium">Tidak ada kontrak yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Forms & Actions) */}
        {(actionType === "create" || actionType === "detail") && (
          <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
            
            {/* Detail Kontrak */}
            {actionType === "detail" && selectedKontrak && (
              <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl w-full mr-2">
                    <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <span className="text-secondary font-bold text-xl">{selectedKontrak.penyewa.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-primary font-bold text-xl">{selectedKontrak.penyewa}</h3>
                      <p className="text-primary/70 text-sm font-bold">Penyewa</p>
                    </div>
                  </div>
                  <button onClick={() => setActionType(null)} className="text-gray-400 hover:text-gray-600 mt-2">×</button>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">ID Kontrak</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.id}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.namaUnit} (Lantai {selectedKontrak.lantai})</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tanggal Mulai</span>
                    <span className="text-primary font-semibold text-sm">{formatTanggal(selectedKontrak.tglMulai)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tanggal Selesai</span>
                    <span className="text-primary font-semibold text-sm">{formatTanggal(selectedKontrak.tglSelesai)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Status</span>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${selectedKontrak.status === "Aktif" ? "bg-success" : "bg-gray-400"}`}>
                        {selectedKontrak.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Untuk detail data pribadi penyewa, buka halaman <strong>Manajemen Penyewa</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* Form Buat Kontrak */}
            {actionType === "create" && (
              <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-primary font-bold text-xl">Buat Kontrak Baru</h3>
                  <button onClick={() => setActionType(null)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                
                <div className="flex flex-col gap-2 relative">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Pilih Penyewa</label>
                  <div 
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 font-sans truncate">
                      {formUser ? availableUsers.find(u => u.id_user === formUser)?.name || "Pilih Penyewa..." : "Pilih Penyewa..."}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {isUserDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {availableUsers.map((user) => (
                        <div 
                          key={user.id_user} 
                          onClick={() => { setFormUser(user.id_user); setIsUserDropdownOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          {user.name} ({user.email})
                        </div>
                      ))}
                      {availableUsers.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">Tidak ada penyewa.</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Pilih Unit (Hanya Tersedia)</label>
                  <div 
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 font-sans truncate">
                      {formUnit ? availableUnits.find(u => u.id === formUnit)?.nama || "Pilih Unit..." : "Pilih Unit..."}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {isUnitDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {availableUnits.map((unit) => (
                        <div 
                          key={unit.id} 
                          onClick={() => { setFormUnit(unit.id); setIsUnitDropdownOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          {unit.nama} - Lt. {unit.lantai}
                        </div>
                      ))}
                      {availableUnits.length === 0 && (
                        <div className="px-4 py-2 text-gray-500">Tidak ada unit tersedia.</div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tanggal Mulai</label>
                  <input 
                    type="date" 
                    value={formTglMulai}
                    onChange={(e) => setFormTglMulai(e.target.value)}
                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tanggal Selesai</label>
                  <input 
                    type="date" 
                    value={formTglAkhir}
                    onChange={(e) => setFormTglAkhir(e.target.value)}
                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <button 
                  onClick={handleSaveForm}
                  disabled={isLoading}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors mt-4 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "Menyimpan..." : "Buat Kontrak"}
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
