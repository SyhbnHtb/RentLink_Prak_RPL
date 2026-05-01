import { ChevronDownIcon, ChevronDownIconLg } from "./icons";

/**
 * FilterControl
 *
 * Komponen untuk input pencarian atau dropdown filter yang ada di atas tabel.
 *
 * Props:
 * - `label`       - Label di atas input (contoh: "Search", "Status", "Lantai")
 * - `placeholder` - Teks placeholder di dalam input (contoh: "Cari Unit...", "Pilih Status...")
 * - `type`        - "search" (tanpa icon chevron) atau "select" (dengan icon chevron)
 * - `iconSize`    - Ukuran icon chevron untuk tipe select: "small" atau "large" (default: "large")
 * - `className`   - Class tambahan untuk container
 */
export default function FilterControl({
  label,
  placeholder,
  type = "select",
  iconSize = "large",
  className = "",
}) {
  return (
    <div
      className={`flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full ${className}`}
    >
      <div className="flex flex-col items-start w-full">
        <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
          {label}
        </p>
      </div>
      <div className="flex flex-col items-start w-full">
        <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px] cursor-pointer">
          {type === "select" && (
            <>
              {iconSize === "large" ? (
                <ChevronDownIconLg fill="black" fillOpacity="0.65" />
              ) : (
                <ChevronDownIcon fill="black" fillOpacity="0.65" />
              )}
            </>
          )}
          <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
            {placeholder}
          </p>
        </div>
      </div>
    </div>
  );
}
