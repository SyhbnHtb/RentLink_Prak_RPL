import AdminLayout from "../components/AdminLayout";

export default function VerifikasiPembayaran() {
  return (
    <AdminLayout title="Verifikasi Pembayaran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input type="text" placeholder="Cari Invoice..." className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" />
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Status</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pending Verifikasi...</span>
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
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Penyewa</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Upload</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-001</td>
                    <td className="py-4 px-6 text-gray-800">Rusdi</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 201</td>
                    <td className="py-4 px-6 text-gray-800">Rp 1.400.000,-</td>
                    <td className="py-4 px-6 text-gray-800">3 Mei 2026</td>
                    <td className="py-4 px-6">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">Pending</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Review</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-800">INV-002</td>
                    <td className="py-4 px-6 text-gray-800">Nasir</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">Rp 2.055.216,-</td>
                    <td className="py-4 px-6 text-gray-800">7 April 2026</td>
                    <td className="py-4 px-6">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">Approved</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Review</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel — Review Bukti Bayar */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
          
          {/* Detail Invoice */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-xl">R</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary font-bold text-xl">Rusdi</h3>
                <p className="text-primary/70 text-sm">Kamar 201</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">INV-ID</span>
                <span className="text-primary font-bold text-lg">INV-001</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Total</span>
                <span className="text-primary font-bold text-lg">Rp 1.400.000,-</span>
              </div>
            </div>

            {/* Pratinjau Bukti Bayar */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Bukti Pembayaran</span>
              <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                  <span className="text-sm font-medium">Pratinjau Bukti Transfer</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-primary font-bold rounded-xl transition-colors cursor-pointer">
              Lihat Ukuran Penuh
            </button>
          </div>

          {/* Action Buttons */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-3">
            <button className="w-full py-3 bg-success hover:bg-green-700 text-white font-bold rounded-full transition-colors cursor-pointer">
              Approve
            </button>
            <button className="w-full py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer">
              Disapprove
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
