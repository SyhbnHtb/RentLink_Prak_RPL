import UserLayout from "../components/UserLayout";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_TAGIHAN, MOCK_KONTRAK } from "../utils/mockData";


export default function GroupUser() {
  const { user } = useAuth();
  const userName = user?.name || "Nasir";

  // Filter data for the specific user
  const userTagihan = MOCK_TAGIHAN.filter(t => t.penyewa === userName);
  const userKontrak = MOCK_KONTRAK.filter(k => k.penyewa === userName);

  // Stats calculations
  const tagihanAktif = userTagihan.filter(t => t.status === "Belum Bayar" || t.status === "Menunggu Konfirmasi")[0];
  const totalTagihanValue = tagihanAktif ? tagihanAktif.total : 0;
  const statusPembayaran = tagihanAktif ? tagihanAktif.status : "Approved";
  const activeUnit = userKontrak.find(k => k.status === "Aktif")?.namaUnit || "-";

  const formatRupiah = (number) => {
    if (number === null || number === undefined) return "Rp -";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const activeTagihanList = userTagihan.filter(t => t.status !== "Approved" && t.status !== "Selesai");
  const riwayatTagihanList = userTagihan.filter(t => t.status === "Approved" || t.status === "Selesai");

  return (
    <UserLayout title={`Selamat Datang Kembali, ${userName}!`}>
      <div className="flex flex-col gap-10 w-full max-w-7xl">
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Status Pembayaran
            </p>
            <div className="mt-1">
              <StatusBadge variant={statusPembayaran} />
            </div>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Total Tagihan
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {formatRupiah(totalTagihanValue)}
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Tagihan Aktif
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {tagihanAktif ? tagihanAktif.id : "-"}
            </p>
          </div>

          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-6 flex flex-col gap-2">
            <p className="text-gray-500 font-sans text-sm md:text-base font-medium uppercase tracking-wider">
              Unit
            </p>
            <p className="text-gray-900 font-sans text-3xl font-bold">
              {activeUnit}
            </p>
          </div>

        </div>

        {/* Ringkasan Pembayaran */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-gray-900 font-sans text-2xl font-bold">
            Tagihan Aktif
          </h2>
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-sans text-lg">
                    <th className="py-4 px-6 font-medium whitespace-nowrap">ID Invoice</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Nama Unit</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total Tagihan</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {activeTagihanList.length > 0 ? activeTagihanList.map((tagihan, index) => (
                    <tr key={tagihan.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{tagihan.id}</td>
                      <td className="py-4 px-6 text-gray-800">{tagihan.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(tagihan.total)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant={tagihan.status} />
                      </td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                        {tagihan.status === "Belum Bayar" && (
                          <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer">Bayar</button>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-gray-500">Tidak ada tagihan aktif.</td>
                    </tr>
                  )}
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
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Tanggal Dibayar</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Total</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 font-medium whitespace-nowrap text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-sans text-base">
                  {riwayatTagihanList.length > 0 ? riwayatTagihanList.map((riwayat, index) => (
                    <tr key={riwayat.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 !== 0 ? 'bg-gray-50/50' : ''}`}>
                      <td className="py-4 px-6 text-gray-800">{riwayat.id}</td>
                      <td className="py-4 px-6 text-gray-800">{riwayat.namaUnit}</td>
                      <td className="py-4 px-6 text-gray-800">{formatTanggal(riwayat.tglDibayar)}</td>
                      <td className="py-4 px-6 text-gray-800">{formatRupiah(riwayat.total)}</td>
                      <td className="py-4 px-6">
                        <StatusBadge variant="Selesai" />
                      </td>
                      <td className="py-4 px-6 text-center space-x-4">
                        <button className="text-primary hover:text-secondary font-medium transition-colors cursor-pointer">Detail</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-gray-500">Belum ada riwayat pembayaran.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}
