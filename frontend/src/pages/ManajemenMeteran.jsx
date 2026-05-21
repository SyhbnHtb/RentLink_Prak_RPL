import AdminLayout from "../components/AdminLayout";
import FilterControl from "../components/FilterControl";
import { useState, useEffect } from "react";
import { useTableFilter } from "../hooks/useTableFilter";
import * as meteranService from "../services/meteranService";
import * as unitService from "../services/unitService";

const TARIF_LISTRIK = 1500;
const TARIF_AIR = 5000;
const BULAN_OPTIONS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

export default function ManajemenMeteran() {
  const { data, filters, handleFilterChange, setData } = useTableFilter([]);
  const [selectedMeteran, setSelectedMeteran] = useState(null);
  const [actionType, setActionType] = useState(null); // 'edit' | 'create'
  const [isLoading, setIsLoading] = useState(false);
  const [availableUnits, setAvailableUnits] = useState([]);
  
  // Form state
  const [formUnit, setFormUnit] = useState("");
  const [formBulan, setFormBulan] = useState("");
  const [formTahun, setFormTahun] = useState(new Date().getFullYear().toString());
  const [formListrikAwal, setFormListrikAwal] = useState("");
  const [formListrikAkhir, setFormListrikAkhir] = useState("");
  const [formAirAwal, setFormAirAwal] = useState("");
  const [formAirAkhir, setFormAirAkhir] = useState("");
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isBulanDropdownOpen, setIsBulanDropdownOpen] = useState(false);

  const fetchMeteran = async () => {
    setIsLoading(true);
    try {
      const meteranList = await meteranService.getMeteran();
      setData(meteranList || []);
    } catch (e) {
      console.error("Gagal memuat meteran", e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUnits = async () => {
    try {
      const units = await unitService.getUnits();
      setAvailableUnits(units || []);
    } catch (e) {
      console.error("Gagal memuat units", e);
    }
  };

  useEffect(() => {
    fetchMeteran();
    fetchUnits();
  }, []);

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
    if (!meteran.id) {
      setActionType("create");
    } else {
      setActionType("edit");
    }
    setFormUnit(meteran.unitId);
    setFormBulan(meteran.bulan || "");
    setFormTahun(meteran.tahun?.toString() || new Date().getFullYear().toString());
    setFormListrikAwal(meteran.listrikAwal?.toString() || "");
    setFormListrikAkhir(meteran.listrikAkhir?.toString() || "");
    setFormAirAwal(meteran.airAwal?.toString() || "");
    setFormAirAkhir(meteran.airAkhir?.toString() || "");
  };

  const handleCreateClick = () => {
    setSelectedMeteran(null);
    setActionType("create");
    setFormUnit("");
    setFormBulan("");
    setFormTahun(new Date().getFullYear().toString());
    setFormListrikAwal("");
    setFormListrikAkhir("");
    setFormAirAwal("");
    setFormAirAkhir("");
  };

  const handleSaveForm = async () => {
    if (!formUnit || !formBulan || !formTahun) return;
    if (formListrikAwal === "" || formListrikAkhir === "" || formAirAwal === "" || formAirAkhir === "") return;
    
    setIsLoading(true);
    try {
      const payload = {
        unit_id: formUnit,
        bulan: formBulan,
        tahun: Number(formTahun),
        meter_listrik_awal: Number(formListrikAwal),
        meter_listrik_akhir: Number(formListrikAkhir),
        meter_air_awal: Number(formAirAwal),
        meter_air_akhir: Number(formAirAkhir)
      };

      if (actionType === "create") {
        await meteranService.createMeteran(payload);
      } else if (actionType === "edit" && selectedMeteran) {
        await meteranService.updateMeteran(selectedMeteran.id, payload);
      }

      await fetchMeteran();
      setActionType(null);
      setSelectedMeteran(null);
    } catch (error) {
      console.error("Gagal menyimpan meteran", error);
    } finally {
      setIsLoading(false);
    }
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
                label="Tahun" 
                placeholder="Pilih Tahun..." 
                type="select" 
                value={filters.tahun}
                onChange={(val) => handleFilterChange("tahun", val)}
                options={["All", "2024", "2025", "2026"]}
              />
            </div>

            {/* Tambah Meteran Button */}
            <button 
              onClick={handleCreateClick}
              disabled={isLoading}
              className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group disabled:opacity-50"
            >
              <span className="text-primary font-sans text-xl font-bold group-hover:scale-105 transition-transform">+ Tambah Meteran</span>
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
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Periode</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Penyewa</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Listrik (kWh)</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Air (m³)</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap">Est. Biaya</th>
                    <th className="py-4 px-5 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {data.length > 0 ? data.map((meteran, index) => {
                    const biayaListrik = (meteran.listrikPakai || 0) * TARIF_LISTRIK;
                    const biayaAir = (meteran.airPakai || 0) * TARIF_AIR;
                    const totalEstimasi = biayaListrik + biayaAir;
                    return (
                    <tr key={meteran.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-5 text-gray-800">
                        <div>{meteran.namaUnit}</div>
                        <div className="text-xs text-gray-400">Lt. {meteran.lantai || "-"}</div>
                      </td>
                      <td className="py-4 px-5 text-gray-800">{meteran.bulan || "-"} {meteran.tahun || ""}</td>
                      <td className="py-4 px-5 text-gray-800">{meteran.penyewa}</td>
                      <td className="py-4 px-5 text-gray-800">
                        <div>{meteran.listrikPakai != null ? meteran.listrikPakai : "-"} kWh</div>
                        <div className="text-xs text-gray-400">{meteran.listrikAwal || "-"} → {meteran.listrikAkhir || "-"}</div>
                      </td>
                      <td className="py-4 px-5 text-gray-800">
                        <div>{meteran.airPakai != null ? meteran.airPakai : "-"} m³</div>
                        <div className="text-xs text-gray-400">{meteran.airAwal || "-"} → {meteran.airAkhir || "-"}</div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="text-gray-800 font-semibold">{formatRupiah(totalEstimasi)}</div>
                        <div className="text-xs text-gray-400">L: {formatRupiah(biayaListrik)} · A: {formatRupiah(biayaAir)}</div>
                      </td>
                      <td className="py-4 px-5 text-center">
                        <button onClick={() => handleEditClick(meteran)} className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">
                          {meteran.id ? "Edit" : "Tambah"}
                        </button>
                      </td>
                    </tr>
                  )}) : (
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
        {actionType && (
          <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
            
            <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-primary font-bold text-xl">{actionType === "create" ? "Tambah Meteran" : "Edit Meteran"}</h3>
                <button onClick={() => { setActionType(null); setSelectedMeteran(null); }} className="text-gray-400 hover:text-gray-600 cursor-pointer">×</button>
              </div>

              {/* Unit Dropdown - only for create */}
              {actionType === "create" ? (
                <div className="flex flex-col gap-2 relative">
                  <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Pilih Unit</label>
                  <div 
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-gray-600 font-sans truncate">
                      {formUnit ? availableUnits.find(u => u.id === formUnit)?.nama || "Pilih Unit..." : "Pilih Unit..."}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {isUnitDropdownOpen && (
                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                      {availableUnits.map((unit) => (
                        <div key={unit.id} onClick={() => { setFormUnit(unit.id); setIsUnitDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">
                          {unit.nama} - Lt. {unit.lantai}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                  <span className="text-primary font-bold text-lg">{selectedMeteran?.namaUnit || "Pilih Unit..."}</span>
                </div>
              )}

              {/* Bulan Dropdown */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Bulan</label>
                <div 
                  onClick={() => setIsBulanDropdownOpen(!isBulanDropdownOpen)}
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer"
                >
                  <span className="text-gray-600 font-sans">{formBulan || "Pilih Bulan..."}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {isBulanDropdownOpen && (
                  <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                    {BULAN_OPTIONS.map((b) => (
                      <div key={b} onClick={() => { setFormBulan(b); setIsBulanDropdownOpen(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700">{b}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tahun */}
              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Tahun</label>
                <input 
                  type="number" value={formTahun} onChange={(e) => setFormTahun(e.target.value)}
                  placeholder="2025" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Listrik Awal (kWh)</label>
                <input type="number" value={formListrikAwal} onChange={(e) => setFormListrikAwal(e.target.value)} placeholder="0" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Listrik Akhir (kWh)</label>
                <input type="number" value={formListrikAkhir} onChange={(e) => setFormListrikAkhir(e.target.value)} placeholder="0" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Air Awal (m³)</label>
                <input type="number" value={formAirAwal} onChange={(e) => setFormAirAwal(e.target.value)} placeholder="0" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Air Akhir (m³)</label>
                <input type="number" value={formAirAkhir} onChange={(e) => setFormAirAkhir(e.target.value)} placeholder="0" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
              </div>

              {/* Live cost preview */}
              {formListrikAwal !== "" && formListrikAkhir !== "" && formAirAwal !== "" && formAirAkhir !== "" && (
                <div className="bg-secondary/10 rounded-xl p-4 flex flex-col gap-1 mt-1">
                  <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Estimasi Biaya</span>
                  <div className="flex justify-between text-sm text-primary font-medium">
                    <span>Listrik ({Math.max(0, Number(formListrikAkhir) - Number(formListrikAwal))} kWh)</span>
                    <span>{formatRupiah(Math.max(0, Number(formListrikAkhir) - Number(formListrikAwal)) * TARIF_LISTRIK)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-primary font-medium">
                    <span>Air ({Math.max(0, Number(formAirAkhir) - Number(formAirAwal))} m³)</span>
                    <span>{formatRupiah(Math.max(0, Number(formAirAkhir) - Number(formAirAwal)) * TARIF_AIR)}</span>
                  </div>
                  <div className="flex justify-between text-base text-primary font-bold border-t border-primary/10 pt-1 mt-1">
                    <span>Total</span>
                    <span>{formatRupiah(
                      Math.max(0, Number(formListrikAkhir) - Number(formListrikAwal)) * TARIF_LISTRIK +
                      Math.max(0, Number(formAirAkhir) - Number(formAirAwal)) * TARIF_AIR
                    )}</span>
                  </div>
                </div>
              )}

              <button 
                onClick={handleSaveForm}
                disabled={isLoading}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors mt-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : (actionType === "create" ? "Tambah Meteran" : "Simpan Perubahan")}
              </button>
            </div>

          </div>
        )}
      </div>
    </AdminLayout>
  );
}
