import AdminLayout from "../components/AdminLayout";

export default function ManagementUnit() {
  return (
    <AdminLayout title="Manajemen Unit">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          
          {/* Top Actions & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-end w-full">
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Status</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between cursor-pointer">
                  <span className="text-gray-600 font-sans font-medium">Pilih Status Unit...</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <div className="bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">Search</label>
                <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center">
                  <input type="text" placeholder="Cari Unit..." className="bg-transparent border-none outline-none w-full text-gray-800 font-sans font-medium placeholder-gray-500" />
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

            {/* Tambah Unit Button (Mobile full width, Desktop auto) */}
            <button className="w-full md:w-auto h-full min-h-[96px] px-8 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center transition-colors cursor-pointer shrink-0 group">
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
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">Kamar 201</td>
                    <td className="py-4 px-6 text-gray-800">2</td>
                    <td className="py-4 px-6 text-gray-800">Rp 200.000,-</td>
                    <td className="py-4 px-6">
                      <span className="bg-danger text-white px-3 py-1 rounded-full text-sm font-medium">Terisi</span>
                    </td>
                    <td className="py-4 px-6 text-gray-800">11 September 2023</td>
                    <td className="py-4 px-6 text-center space-x-4">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Edit</button>
                      <button className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Hapus</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
                    <td className="py-4 px-6 text-gray-800">Rp 200.000,-</td>
                    <td className="py-4 px-6">
                      <span className="bg-success text-white px-3 py-1 rounded-full text-sm font-medium">Tersedia</span>
                    </td>
                    <td className="py-4 px-6 text-gray-800">1 April 2022</td>
                    <td className="py-4 px-6 text-center space-x-4">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Edit</button>
                      <button className="text-danger hover:text-red-700 font-medium transition-colors cursor-pointer">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Panel (Forms & Actions) */}
        <div className="w-full xl:w-80 flex flex-col gap-6 shrink-0">
          
          {/* Form Tambah Unit */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-4">
            <h3 className="text-primary font-bold text-xl mb-2">Buat Unit Baru</h3>
            
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama Unit</label>
              <input type="text" placeholder="Masukkan nama unit..." className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Lantai Unit</label>
              <div className="w-full bg-gray-100 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer">
                <span className="text-gray-600 font-sans">Pilih Lantai...</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            <button className="w-full py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors mt-4 cursor-pointer">
              Buat Unit
            </button>
          </div>

          {/* Hapus Confirmation Modal (Simulation) */}
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-3 text-center">
            <p className="text-gray-800 font-bold text-lg mb-2">Hapus Unit?</p>
            <button className="w-full py-3 bg-danger hover:bg-red-700 text-white font-bold rounded-full transition-colors cursor-pointer">
              Hapus
            </button>
            <button className="w-full py-3 bg-success hover:bg-green-700 text-white font-bold rounded-full transition-colors cursor-pointer">
              Batal
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
