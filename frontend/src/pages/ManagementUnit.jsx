import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import { useState } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import { MOCK_UNITS } from "../utils/mockData";

export default function ManagementUnit() {
  const { data, filters, handleFilterChange, setData } = useTableFilter(MOCK_UNITS);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [actionType, setActionType] = useState(null); // 'create', 'edit', 'delete'
  
  // Form state
  const [formNama, setFormNama] = useState("");
  const [formLantai, setFormLantai] = useState("");
  const [isLantaiDropdownOpen, setIsLantaiDropdownOpen] = useState(false);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleEditClick = (unit) => {
    setSelectedUnit(unit);
    setActionType("edit");
    setFormNama(unit.nama);
    setFormLantai(unit.lantai);
  };

  const handleDeleteClick = (unit) => {
    setSelectedUnit(unit);
    setActionType("delete");
  };

  const handleCreateClick = () => {
    setSelectedUnit(null);
    setActionType("create");
    setFormNama("");
    setFormLantai("");
  };

  const handleSaveForm = () => {
    if (!formNama || !formLantai) return;
    
    if (actionType === "create") {
      const newUnit = {
        id: `U-00${data.length + 5}`, // Mock ID
        nama: formNama,
        lantai: formLantai,
        harga: 200000, // Default mock price
        status: "Tersedia",
        createdAt: new Date().toISOString().split('T')[0]
      };
      setData([...data, newUnit]);
    } else if (actionType === "edit") {
      const updatedData = data.map(item => 
        item.id === selectedUnit.id ? { ...item, nama: formNama, lantai: formLantai } : item
      );
      setData(updatedData);
    }
    
    setActionType(null);
    setFormNama("");
    setFormLantai("");
  };

  const confirmDelete = () => {
    setData(data.filter(item => item.id !== selectedUnit.id));
    setActionType(null);
    setSelectedUnit(null);
  };

  return (
    <AdminLayout title="Manajemen Unit">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Actions & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <FilterControl 
                label="Status" 
                placeholder="Pilih Status Unit..." 
                type="select" 
                value={filters.status}
                onChange={(val) => handleFilterChange("status", val)}
                options={["All", "Tersedia", "Terisi"]}
              />
              <FilterControl 
                label="Search" 
                placeholder="Cari Unit..." 
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

            {/* Tambah Unit Button */}
            <button 
              onClick={handleCreateClick}
              className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group"
            >
              <span className="text-primary font-sans text-xl font-bold group-hover:scale-105 transition-transform">+ Tambah Unit</span>
            </button>
            
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Lantai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Harga</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibuat</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? data.map((unit, index) => (
                    <tr key={unit.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{unit.nama}</td>
                      <td className="py-4 px-6 text-gray-800">{unit.lantai}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(unit.harga)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant={unit.status} />
                      </td>
                      <td className="py-4 px-6 text-gray-800">{unit.createdAt}</td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button onClick={() => handleEditClick(unit)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Edit</button>
                        <button onClick={() => handleDeleteClick(unit)} className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Hapus</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-gray-500 font-medium">Tidak ada unit yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Forms & Actions) */}
        {(actionType === "create" || actionType === "edit" || actionType === "delete") && (
          <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
            
            {/* Form Tambah/Edit Unit */}
            {(actionType === "create" || actionType === "edit") && (
              <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-primary font-bold text-xl">{actionType === "create" ? "Buat Unit Baru" : "Edit Unit"}</h3>
                  <button onClick={() => setActionType(null)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama Unit</label>
                  <input 
                    type="text" 
                    value={formNama}
                    onChange={(e) => setFormNama(e.target.value)}
                    placeholder="Masukkan nama unit..." 
                    className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                  />
                </div>
                
                <div className="flex flex-col gap-2 relative">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Lantai Unit</label>
                  <div 
                    onClick={() => setIsLantaiDropdownOpen(!isLantaiDropdownOpen)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 font-sans">{formLantai || "Pilih Lantai..."}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {isLantaiDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                      {["1", "2"].map((lantai) => (
                        <div 
                          key={lantai} 
                          onClick={() => { setFormLantai(lantai); setIsLantaiDropdownOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                        >
                          Lantai {lantai}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleSaveForm}
                  className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors mt-4 cursor-pointer"
                >
                  {actionType === "create" ? "Buat Unit" : "Simpan Perubahan"}
                </button>
              </div>
            )}

            {/* Hapus Confirmation Modal */}
            {actionType === "delete" && selectedUnit && (
              <ConfirmDialog 
                title={`Hapus ${selectedUnit.nama}?`}
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
