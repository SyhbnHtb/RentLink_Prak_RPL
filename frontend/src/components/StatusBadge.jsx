/**
 * StatusBadge
 *
 * Komponen untuk menampilkan badge status (Aktif, Selesai, Terisi, dll) dengan warna yang sesuai.
 *
 * Props:
 * - `variant`  - string status, huruf besar/kecil tidak masalah. (contoh: "aktif", "selesai", "terisi")
 * - `label`    - string teks yang akan ditampilkan. Jika kosong, akan menggunakan nilai `variant` (dengan huruf pertama kapital).
 * - `className` - class tambahan jika diperlukan.
 *
 * Contoh penggunaan:
 * <StatusBadge variant="aktif" />
 * <StatusBadge variant="belum bayar" label="Belum Bayar" />
 */
export default function StatusBadge({ variant, label, className = "" }) {
  const normalizedVariant = variant?.toLowerCase() || "";
  const displayLabel =
    label || variant.charAt(0).toUpperCase() + variant.slice(1);

  let bgColor = "bg-[#8F8383]"; // Default: abu-abu (Selesai/Unknown)

  // Mapping warna berdasarkan variant
  switch (normalizedVariant) {
    case "aktif":
    case "tersedia":
      bgColor = "bg-[#28A745]"; // Hijau cerah
      break;
    case "approved":
      bgColor = "bg-[#1A7A45]"; // Hijau tua
      break;
    case "terisi":
    case "belum bayar":
    case "disapproved":
      bgColor = "bg-[#DC3545]"; // Merah (Ada juga #BF3B3B di desain, kita seragamkan ke #DC3545 atau bisa spesifik)
      if (normalizedVariant === "terisi") {
         bgColor = "bg-[#BF3B3B]"; // Di desain ManagementUnit menggunakan #BF3B3B untuk Terisi di tabel
      }
      break;
    case "pending":
      bgColor = "bg-[#FDC262]"; // Kuning/Orange
      break;
    default:
      break;
  }

  return (
    <div
      className={`flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl w-fit ${bgColor} ${className}`}
    >
      <p className="text-[#FFF] font-roboto text-xl w-fit m-0 leading-none">
        {displayLabel}
      </p>
    </div>
  );
}
