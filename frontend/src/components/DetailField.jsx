/**
 * DetailField
 *
 * Komponen untuk menampilkan pasangan label dan value (biasanya di side panel).
 * Contoh: "Email" (label hijau kecil) -> "email@gmail.com" (value tebal).
 *
 * Props:
 * - `label` - teks label di atas (contoh: "Email", "Unit")
 * - `value` - teks nilai di bawah (contoh: "email@gmail.com", "102")
 * - `className` - class tambahan untuk pembungkus
 */
export default function DetailField({ label, value, className = "" }) {
  return (
    <div className={`flex flex-col items-start w-[309px] ${className}`}>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#408A71] font-plusJakartaSans text-xs font-bold w-full tracking-[0.0342em] uppercase">
          {label}
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <p className="text-[#285A48] font-sora text-base font-semibold w-full">
          {value}
        </p>
      </div>
    </div>
  );
}
