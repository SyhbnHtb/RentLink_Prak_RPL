import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import { useState } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import { MOCK_KONTRAK } from "../utils/mockData";

export default function ManajemenKontrak() {
  const { data, filters, handleFilterChange, setData } = useTableFilter(MOCK_KONTRAK);
  const [selectedKontrak, setSelectedKontrak] = useState(null);
  const [actionType, setActionType] = useState(null); // 'create', 'detail'
  
  // Form state for creating kontrak
  const [formNama, setFormNama] = useState("");
  const [formUnit, setFormUnit] = useState("");
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  const handleDetailClick = (kontrak) => {
    setSelectedKontrak(kontrak);
    setActionType("detail");
  };

  const handleCreateClick = () => {
    setSelectedKontrak(null);
    setActionType("create");
    setFormNama("");
    setFormUnit("");
  };

  const handleSaveForm = () => {
    if (!formNama || !formUnit) return;
    
    if (actionType === "create") {
      const newKontrak = {
        id: `C-00${data.length + 3}`, // Mock ID
        idUnit: "U-NEW",
        namaUnit: formUnit,
        lantai: formUnit.includes("1") ? "1" : "2",
        penyewa: formNama,
        tglMulai: new Date().toISOString().split('T')[0],
        tglSelesai: "2027-01-01",
        status: "Aktif",
        penyewaDetail: { email: `${formNama.toLowerCase().replace(/\s/g, '')}@gmail.com`, asal: "Unknown", ktp: "00000000", telp: "00000000" }
      };
      setData([...data, newKontrak]);
    }
    
    setActionType(null);
    setFormNama("");
    setFormUnit("");
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
              className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group"
            >
              <span className="text-primary font-sans text-xl font-bold group-hover:scale-105 transition-transform">+ Buat Kontrak</span>
            </button>
            
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
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
                          <button className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Akhiri</button>
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
            
            {/* Detail Penyewa */}
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

                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email</span>
                    <span className="text-primary font-semibold text-sm break-all">{selectedKontrak.penyewaDetail?.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Asal</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.penyewaDetail?.asal}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">KTP</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.penyewaDetail?.ktp}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Telepon</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.penyewaDetail?.telp}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                    <span className="text-primary font-semibold text-sm">{selectedKontrak.namaUnit}</span>
                  </div>
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
                
                <div className="flex flex-col gap-2">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama Penyewa</label>
                  <input 
                    type="text" 
                    value={formNama}
                    onChange={(e) => setFormNama(e.target.value)}
                    placeholder="Nama Penyewa..." 
                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Pilih Unit</label>
                  <div 
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 font-sans">{formUnit || "Pilih Unit..."}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {isUnitDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {["Kamar 101", "Kamar 102", "Kamar 201", "Kamar 202"].map((unit) => (
                        <div 
                          key={unit} 
                          onClick={() => { setFormUnit(unit); setIsUnitDropdownOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          {unit}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSaveForm}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors mt-4 cursor-pointer"
                >
                  Buat Kontrak
                </button>
              </div>
            )}

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
