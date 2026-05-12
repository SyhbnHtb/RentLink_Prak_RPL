import AdminLayout from "../components/AdminLayout";

export default function DashboardAdmin() {
  return (
    <AdminLayout title="Selamat Datang Kembali, Admin!">
      <div className="flex flex-col gap-10 w-full max-w-7xl">

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Total Unit Tersedia
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              xx Unit
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Unit Terisi
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              xx Unit
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Tagihan Aktif
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              xx Tagihan
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Pembayaran Pending
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              xx Unit
            </p>
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
                    <th className="py-4 px-6 font-medium">ID Invoice</th>
                    <th className="py-4 px-6 font-medium">Nama Unit</th>
                    <th className="py-4 px-6 font-medium">Lantai</th>
                    <th className="py-4 px-6 font-medium text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">INV-001</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">
                        Detail
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Kontrak Terbaru */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Kontrak Terbaru
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium">ID</th>
                    <th className="py-4 px-6 font-medium">Nama Unit</th>
                    <th className="py-4 px-6 font-medium">Lantai</th>
                    <th className="py-4 px-6 font-medium text-center">Opsi</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800">C-001</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 201</td>
                    <td className="py-4 px-6 text-gray-800">2</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">
                        Detail
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-gray-50/50">
                    <td className="py-4 px-6 text-gray-800">C-002</td>
                    <td className="py-4 px-6 text-gray-800">Kamar 102</td>
                    <td className="py-4 px-6 text-gray-800">1</td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">
                        Detail
                      </button>
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
