import AdminLayout from "../components/AdminLayout";

export default function GroupUser() {
  return (
    <AdminLayout title="Selamat Datang Kembali, Nasir!">
      <div className="flex flex-col gap-10 w-full max-w-7xl">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Status Pembayaran
            </p>
            <div className="mt-1">
              <span className="bg-success text-white px-4 py-2 rounded-full text-base font-bold">Approved</span>
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Total Tagihan
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              Rp 2.055.216,-
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Tagihan Aktif
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              INV-001
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Unit
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              Kamar 102
            </p>
          </div>

        </div>

        {/* Ringkasan Pembayaran */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Ringkasan Pembayaran
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Lantai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Mulai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Selesai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-001</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
                    <td className="py-4 px-6 text-gray-800">1 April 2026</td>
                    <td className="py-4 px-6 text-gray-800">11 April 2026</td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-medium">Selesai</span>
                    </td>
                    <td className="py-4 px-6 text-center space-x-4">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                      <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer">Bayar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Riwayat Pembayaran */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Riwayat Pembayaran
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Lantai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Mulai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Selesai</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-001</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
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

      </div>
    </AdminLayout>
  );
}
