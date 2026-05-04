import AdminLayout from "../components/AdminLayout";

export default function LaporanKeuangan() {
  return (
    <AdminLayout title="Laporan Keuangan">
      <div className="flex flex-col gap-10 w-full max-w-7xl">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Total Pemasukan Bulan Ini</p>
            <p className="text-gray-900 font-sans text-3xl font-bold">Rp 3.455.216,-</p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Tagihan Belum Lunas</p>
            <p className="text-danger font-sans text-3xl font-bold">Rp 1.400.000,-</p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Total Unit Aktif</p>
            <p className="text-gray-900 font-sans text-3xl font-bold">2</p>
          </div>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm font-medium uppercase tracking-wider">Pembayaran Selesai</p>
            <p className="text-success font-sans text-3xl font-bold">1</p>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
            <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Tahun</label>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
              <span className="text-gray-600 font-sans font-medium">2026</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
            <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Bulan</label>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
              <span className="text-gray-600 font-sans font-medium">Semua Bulan</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
            <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <input type="text" placeholder="Cari transaksi..." className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" />
            </div>
          </div>
        </div>

        {/* Tabel Riwayat Transaksi */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">Riwayat Transaksi</h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Bayar</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-002</td>
                    <td className="py-4 px-6 text-gray-800">Nasir</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">7 April 2026</td>
                    <td className="py-4 px-6 text-gray-800 font-semibold">Rp 2.055.216,-</td>
                    <td className="py-4 px-6">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">Lunas</span>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-800">INV-001</td>
                    <td className="py-4 px-6 text-gray-800">Rusdi</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 201</td>
                    <td className="py-4 px-6 text-gray-800">-</td>
                    <td className="py-4 px-6 text-gray-800 font-semibold">Rp 1.400.000,-</td>
                    <td className="py-4 px-6">
                      <span className="bg-danger text-white px-3 py-1 rounded-full text-sm font-medium">Belum Lunas</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
