import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import { useState } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import { MOCK_METERAN } from "../utils/mockData";

export default function ManajemenMeteran() {
  const { data, filters, handleFilterChange, setData } = useTableFilter(MOCK_METERAN);
  const [selectedMeteran, setSelectedMeteran] = useState(null);
  
  // Form state
  const [formListrik, setFormListrik] = useState("");
  const [formAir, setFormAir] = useState("");

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleEditClick = (meteran) => {
    setSelectedMeteran(meteran);
    setFormListrik(meteran.listrik || "");
    setFormAir(meteran.air || "");
  };

  const handleSaveForm = () => {
    if (!selectedMeteran) return;
    
    // Calculate mock total (just a dummy calculation)
    const total = (Number(formListrik) * 1500) + (Number(formAir) * 5000);

    const updatedData = data.map(item => 
      item.id === selectedMeteran.id 
        ? { ...item, listrik: Number(formListrik), air: Number(formAir), total } 
        : item
    );
    
    setData(updatedData);
    setSelectedMeteran(null);
    setFormListrik("");
    setFormAir("");
  };

  return (
    <AdminLayout title="Manajemen Meteran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FilterControl 
                label="Search" 
                placeholder="Cari Unit atau Penyewa..." 
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
          </div>

          {/* Table */}
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Lantai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Listrik (kWh)</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Air (m³)</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? data.map((meteran, index) => (
                    <tr key={meteran.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{meteran.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{meteran.lantai}</td>
                      <td className="py-4 px-6 text-gray-800">{meteran.penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{meteran.listrik !== null ? meteran.listrik : "-"}</td>
                      <td className="py-4 px-6 text-gray-800">{meteran.air !== null ? meteran.air : "-"}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(meteran.total)}</td>
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => handleEditClick(meteran)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500 font-medium">Tidak ada data meteran yang ditemukan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Forms & Actions) */}
        {selectedMeteran && (
          <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
            
            {/* Form Edit Meteran */}
            <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-primary font-bold text-xl">Edit Meteran</h3>
                <button onClick={() => setSelectedMeteran(null)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                <span className="text-primary font-bold text-lg">{selectedMeteran.namaUnit}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Listrik (kWh)</label>
                <input 
                  type="number" 
                  value={formListrik}
                  onChange={(e) => setFormListrik(e.target.value)}
                  placeholder="Masukkan Meteran..." 
                  className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Air (m³)</label>
                <input 
                  type="number" 
                  value={formAir}
                  onChange={(e) => setFormAir(e.target.value)}
                  placeholder="Masukkan Meteran..." 
                  className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>

              <button 
                onClick={handleSaveForm}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors mt-4 cursor-pointer"
              >
                Simpan
              </button>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
