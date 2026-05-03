import AdminLayout from "../components/AdminLayout";

export default function RiwayatPembayaran() {
  return (
    <AdminLayout title="Riwayat Pembayaran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Tahun</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pilih Tahun Tagihan...</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input type="text" placeholder="Cari Tagihan..." className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" />
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Sort</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Urutkan Pembayaran...</span>
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
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibayar</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-002</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">Nasir</td>
                    <td className="py-4 px-6 text-gray-800">7 April 2026</td>
                    <td className="py-4 px-6 text-gray-800">Rp 2.055.216,-</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">Selesai</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Details & Actions) */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
          
          {/* Detail Card (Simulation) */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-6">
            <h3 className="text-primary font-bold text-xl mb-2">Detail Tagihan</h3>
            
            <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-xl">N</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary font-bold text-xl">Nasir</h3>
                <p className="text-primary/70 text-sm">Kamar 102</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">INV-ID</span>
                <span className="text-primary font-bold text-lg">INV-002</span>
              </div>

              <div className="flex flex-col gap-1 border-t border-gray-100 pt-4 mt-2">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider mb-2">Biaya Sewa</span>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Periode (hari)</span>
                  <span>30 hari</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-primary">
                  <span>Kamar</span>
                  <span>2.000.000,-</span>
                </div>
                <div className="flex justify-between text-base font-bold text-primary mt-2 border-t border-gray-100 pt-2">
                  <span>Total</span>
                  <span>2.055.216,-</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Dibayar Pada</span>
                <span className="text-primary font-bold text-lg">07/04/2026</span>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-primary font-bold rounded-xl transition-colors mt-2 cursor-pointer">
              Lihat Bukti Pembayaran
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
