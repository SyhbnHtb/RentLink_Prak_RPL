import AdminLayout from "../components/AdminLayout";

export default function ManajemenKontrak() {
  return (
    <AdminLayout title="Manajemen Kontrak">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Actions & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Status</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pilih Status Kontrak...</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input type="text" placeholder="Cari Kontrak..." className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" />
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Lantai</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pilih Lantai...</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Tambah Kontrak Button */}
            <button className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group">
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
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">C-001</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 201</td>
                    <td className="py-4 px-6 text-gray-800">2</td>
                    <td className="py-4 px-6 text-gray-800">Rusdi</td>
                    <td className="py-4 px-6 text-gray-800">11 September 2026</td>
                    <td className="py-4 px-6 text-gray-800">18 September 2026</td>
                    <td className="py-4 px-6">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">Aktif</span>
                    </td>
                    <td className="py-4 px-6 text-center space-x-4">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                      <button className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Akhiri</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-800">C-002</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
                    <td className="py-4 px-6 text-gray-800">Nasir</td>
                    <td className="py-4 px-6 text-gray-800">1 April 2026</td>
                    <td className="py-4 px-6 text-gray-800">11 April 2026</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">Selesai</span>
                    </td>
                    <td className="py-4 px-6 text-center space-x-4">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Forms & Actions) */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
          
          {/* Detail Penyewa Modal Simulation */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
            <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0">
                <span className="text-secondary font-bold text-xl">N</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary font-bold text-xl">Nasir</h3>
                <p className="text-primary/70 text-sm font-bold">KingNasir</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email</span>
                <span className="text-primary font-semibold text-sm break-all">email@gmail.com</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Asal</span>
                <span className="text-primary font-semibold text-sm">Ngawi</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">KTP</span>
                <span className="text-primary font-semibold text-sm">910216769</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Telepon</span>
                <span className="text-primary font-semibold text-sm">0123456789</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-primary/70 text-xs font-bold uppercase tracking-wider">Unit</span>
                <span className="text-primary font-semibold text-sm">102</span>
              </div>
            </div>
          </div>

          {/* Form Buat Kontrak */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
            <h3 className="text-primary font-bold text-xl mb-2">Buat Kontrak Baru</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama</label>
              <input type="text" placeholder="Nama Penyewa..." className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Pilih Unit</label>
              <div className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer">
                <span className="text-gray-600 font-sans">Kamar 102</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors mt-4 cursor-pointer">
              Buat Kontrak
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
