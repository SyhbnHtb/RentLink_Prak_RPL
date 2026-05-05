import UserLayout from "../components/UserLayout";

export default function UploadBuktiPembayaran() {
  return (
    <UserLayout title="Upload Bukti Pembayaran">
      <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1600px] items-start">

        {/* Info Tagihan */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
            <h2 className="text-gray-900 font-sans text-2xl font-bold">Tagihan Aktif</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">INV-ID</span>
                <span className="text-gray-900 font-bold text-lg">INV-001</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Unit</span>
                <span className="text-gray-900 font-bold text-lg">Kamar 102</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total</span>
                <span className="text-gray-900 font-bold text-lg">Rp 2.055.216,-</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Status</span>
                <span className="bg-danger text-white px-3 py-1 rounded-full text-sm font-medium w-fit">Belum Bayar</span>
              </div>
            </div>

            {/* Rincian Biaya */}
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Biaya Sewa</span>
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Periode (hari)</span><span>10 hari</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Kamar</span><span>2.000.000,-</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Listrik</span><span>20.216,-</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800">
                <span>Air</span><span>35.000,-</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900 mt-2 border-t border-gray-100 pt-2">
                <span>Total</span><span>2.055.216,-</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        <div className="w-full xl:w-96 flex flex-col gap-6 shrink-0">
          <div className="bg-surface rounded-2xl border-2 border-secondary shadow-lg p-6 flex flex-col gap-5">
            <h3 className="text-primary font-bold text-xl">Upload Bukti Transfer</h3>

            {/* Drop Zone */}
            <div className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-secondary/50 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-secondary/5 transition-colors">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/50"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <p className="text-primary font-sans font-semibold text-sm">Choose File or Drag File</p>
              <p className="text-gray-400 text-xs">File Type: JPG, PNG, PDF</p>
            </div>

            <button className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer text-lg">
              Kirim
            </button>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}
