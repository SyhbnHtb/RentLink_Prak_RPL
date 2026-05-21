import UserLayout from "../components/UserLayout";
import { useState, useEffect } from "react";
import * as userService from "../services/userService";
import * as meteranService from "../services/meteranService";

const TARIF_LISTRIK = 1500;
const TARIF_AIR = 5000;

export default function UserMeteran() {
  const [unit, setUnit] = useState(null);
  const [meteranList, setMeteranList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const unitData = await userService.getUnitSaya();
        setUnit(unitData);

        const meteranData = await meteranService.getMeteranSaya();
        setMeteranList(meteranData || []);
      } catch (error) {
        console.error("Gagal mengambil data meteran saya", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const latestMeteran = meteranList.length > 0 ? meteranList[0] : null;

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <UserLayout title="Data Meteran & Utilitas">
      <div className="flex flex-col gap-8 w-full max-w-4xl relative">
        
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {unit ? (
          <>
            {/* Unit Info */}
            <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0">
                  <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-gray-900 font-bold text-2xl">{unit.nama_unit}</h2>
                  <p className="text-gray-500 text-sm">Lantai {unit.lantai} · ID: {unit.id_unit}</p>
                </div>
              </div>

              {/* Latest period summary */}
              {latestMeteran ? (
                <>
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <span className="text-gray-500 text-sm font-medium">Periode Terbaru</span>
                    <span className="text-primary font-bold">{latestMeteran.bulan} {latestMeteran.tahun}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    {/* Listrik */}
                    <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span className="text-yellow-700 font-semibold text-sm uppercase tracking-wider">Listrik</span>
                      </div>
                      <p className="text-gray-900 font-bold text-2xl">
                        {formatRupiah((latestMeteran.listrikPakai || 0) * TARIF_LISTRIK)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {latestMeteran.listrikPakai || 0} kWh ({latestMeteran.listrikAwal} → {latestMeteran.listrikAkhir})
                      </p>
                    </div>

                    {/* Air */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707.707" />
                          </svg>
                        </div>
                        <span className="text-blue-700 font-semibold text-sm uppercase tracking-wider">Air</span>
                      </div>
                      <p className="text-gray-900 font-bold text-2xl">
                        {formatRupiah((latestMeteran.airPakai || 0) * TARIF_AIR)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {latestMeteran.airPakai || 0} m³ ({latestMeteran.airAwal} → {latestMeteran.airAkhir})
                      </p>
                    </div>

                    {/* Total Biaya */}
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-green-700 font-semibold text-sm uppercase tracking-wider">Total Utilitas</span>
                      </div>
                      <p className="text-gray-900 font-bold text-2xl">
                        {formatRupiah(
                          (latestMeteran.listrikPakai || 0) * TARIF_LISTRIK +
                          (latestMeteran.airPakai || 0) * TARIF_AIR
                        )}
                      </p>
                      <p className="text-gray-500 text-xs">Listrik + Air bulan ini</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center text-gray-500 text-sm">
                  Belum ada data meteran untuk unit ini.
                </div>
              )}
            </div>

            {/* Riwayat Meteran Table */}
            {meteranList.length > 1 && (
              <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h2 className="text-gray-900 font-sans text-xl font-bold">Riwayat Meteran</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-primary text-white font-sans text-base">
                        <th className="py-4 px-6 font-medium">Periode</th>
                        <th className="py-4 px-6 font-medium">Listrik (kWh)</th>
                        <th className="py-4 px-6 font-medium">Air (m³)</th>
                        <th className="py-4 px-6 font-medium">Est. Biaya</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans text-base">
                      {meteranList.map((m, index) => (
                        <tr key={m.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                          <td className="py-4 px-6 text-gray-800 font-medium">{m.bulan} {m.tahun}</td>
                          <td className="py-4 px-6 text-gray-800">
                            {m.listrikPakai ?? 0} kWh
                            <span className="text-gray-400 text-xs ml-1">({m.listrikAwal}→{m.listrikAkhir})</span>
                          </td>
                          <td className="py-4 px-6 text-gray-800">
                            {m.airPakai ?? 0} m³
                            <span className="text-gray-400 text-xs ml-1">({m.airAwal}→{m.airAkhir})</span>
                          </td>
                          <td className="py-4 px-6 text-gray-800 font-semibold">
                            {formatRupiah((m.listrikPakai || 0) * TARIF_LISTRIK + (m.airPakai || 0) * TARIF_AIR)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Info Catatan */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-800 font-semibold text-sm">Informasi Meteran & Utilitas</p>
                <p className="text-blue-600 text-sm mt-1">
                  Data pemakaian diperbarui setiap awal bulan oleh admin. Tarif: Listrik Rp1.500/kWh, Air Rp5.000/m³.
                  Biaya ini akan ditagihkan bersama tagihan sewa bulanan Anda.
                </p>
              </div>
            </div>
          </>
        ) : !isLoading && (
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-12 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Kamu belum menyewa unit atau data tidak ditemukan.</p>
            <p className="text-gray-400 text-sm">Hubungi admin jika kamu merasa ada masalah.</p>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
