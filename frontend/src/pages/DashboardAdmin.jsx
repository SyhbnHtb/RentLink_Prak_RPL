import AdminLayout from "../components/AdminLayout";
import StatusBadge from "../components/StatusBadge";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);
  const [recentTagihan, setRecentTagihan] = useState([]);
  const [recentPembayaran, setRecentPembayaran] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/dashboard/admin/stats');
        if (response.data.success) {
          const data = response.data.data;
          setStats(data.statistik);
          setRecentTagihan(data.tagihan_terbaru || []);
          setRecentPembayaran(data.pembayaran_terbaru || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data dashboard admin", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const mapStatusBadge = (status) => {
    if (status === 'lunas') return 'Approved';
    if (status === 'pending') return 'Menunggu Konfirmasi';
    if (status === 'belum') return 'Belum Bayar';
    if (status === 'ditolak') return 'Ditolak';
    return status;
  };

  return (
    <AdminLayout title="Selamat Datang Kembali, Admin!">
      <div className="flex flex-col gap-10 w-full max-w-7xl relative">

        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Total Unit Tersedia
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {stats ? `${stats.unit_tersedia} Unit` : "-"}
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Unit Terisi
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {stats ? `${stats.unit_terisi} Unit` : "-"}
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Tagihan Belum Lunas
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {stats ? `${stats.tagihan_belum + stats.tagihan_pending} Tagihan` : "-"}
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Pembayaran Pending
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {stats ? `${stats.pembayaran_pending} Pembayaran` : "-"}
            </p>
          </div>

        </div>

        {/* Summary Cards Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Total Penyewa</p>
            <p className="text-gray-900 font-sans text-3xl font-bold">{stats ? stats.total_penyewa : "-"}</p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Kontrak Aktif</p>
            <p className="text-gray-900 font-sans text-3xl font-bold">{stats ? stats.kontrak_aktif : "-"}</p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Total Pemasukan</p>
            <p className="text-success font-sans text-3xl font-bold">{stats ? formatRupiah(stats.total_pemasukan) : "-"}</p>
          </div>
        </div>

        {/* Tagihan Terbaru */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Tagihan Terbaru
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium">ID Invoice</th>
                    <th className="py-4 px-6 font-medium">Penyewa</th>
                    <th className="py-4 px-6 font-medium">Nama Unit</th>
                    <th className="py-4 px-6 font-medium">Total</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {recentTagihan.length > 0 ? recentTagihan.map((t, index) => (
                    <tr key={t.id_tagihan} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">INV-{String(t.id_tagihan).padStart(3, '0')}</td>
                      <td className="py-4 px-6 text-gray-800">{t.nama_penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{t.nama_unit}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(t.total)}</td>
                      <td className="py-4 px-6"><StatusBadge variant={mapStatusBadge(t.status)} /></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500">Belum ada tagihan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pembayaran Terbaru */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Pembayaran Terbaru
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium">ID</th>
                    <th className="py-4 px-6 font-medium">Penyewa</th>
                    <th className="py-4 px-6 font-medium">Unit</th>
                    <th className="py-4 px-6 font-medium">Total</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {recentPembayaran.length > 0 ? recentPembayaran.map((p, index) => (
                    <tr key={p.id_pembayaran} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{p.id_pembayaran}</td>
                      <td className="py-4 px-6 text-gray-800">{p.nama_penyewa}</td>
                      <td className="py-4 px-6 text-gray-800">{p.nama_unit}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(p.total)}</td>
                      <td className="py-4 px-6"><StatusBadge variant={mapStatusBadge(p.status_pembayaran)} /></td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500">Belum ada pembayaran.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
