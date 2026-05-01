/**
 * ConfirmDialog
 *
 * Komponen dialog konfirmasi (misalnya untuk "Hapus Unit?", "Akhiri Paksa Kontrak?").
 * Biasanya ditampilkan melayang (absolute) di atas layar.
 *
 * Props:
 * - `title`       - Pertanyaan konfirmasi (contoh: "Hapus Unit?")
 * - `confirmText` - Teks tombol konfirmasi (default: "Hapus")
 * - `cancelText`  - Teks tombol batal (default: "Batal")
 * - `onConfirm`   - Fungsi yang dipanggil saat tombol konfirmasi ditekan
 * - `onCancel`    - Fungsi yang dipanggil saat tombol batal ditekan
 * - `className`   - Class tambahan untuk container (sering dipakai untuk posisi absolut)
 */
export default function ConfirmDialog({
  title,
  confirmText = "Hapus",
  cancelText = "Batal",
  onConfirm,
  onCancel,
  className = "",
}) {
  return (
    <div
      className={`flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] ${className}`}
    >
      <div className="flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.22)] w-full">
        <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit text-center">
          {title}
        </p>
      </div>
      <button
        onClick={onConfirm}
        className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[#DC3545] w-full"
      >
        <p className="text-[#FFF] font-sora text-[19px] font-semibold w-fit">
          {confirmText}
        </p>
      </button>
      <button
        onClick={onCancel}
        className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[#28A745] w-full"
      >
        <p className="text-[#FFF] font-sora text-[19px] font-semibold w-fit">
          {cancelText}
        </p>
      </button>
    </div>
  );
}
