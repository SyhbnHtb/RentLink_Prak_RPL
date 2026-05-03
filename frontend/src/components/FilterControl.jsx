import { ChevronDownIcon, ChevronDownIconLg } from "./icons";
import { useState, useRef, useEffect } from "react";

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
 * - `value`       - Nilai saat ini (controlled)
 * - `onChange`    - Callback saat nilai berubah
 * - `options`     - Array string untuk opsi dropdown (hanya tipe "select")
 */
export default function FilterControl({
  label,
  placeholder,
  type = "select",
  iconSize = "large",
  className = "",
  value,
  onChange,
  options = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full ${className}`}
    >
      <div className="flex flex-col items-start w-full">
        <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
          {label}
        </p>
      </div>
      <div className="flex flex-col items-start w-full relative" ref={dropdownRef}>
        {type === "select" ? (
          <>
            <div 
              className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px] cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {iconSize === "large" ? (
                <ChevronDownIconLg fill="black" fillOpacity="0.65" />
              ) : (
                <ChevronDownIcon fill="black" fillOpacity="0.65" />
              )}
              <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                {value && value !== "All" ? value : placeholder}
              </p>
            </div>
            {isOpen && (
              <div className="absolute top-full mt-2 w-[309px] bg-white rounded-[15px] shadow-lg border border-gray-100 z-50 overflow-hidden max-h-[250px] overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="px-[19px] py-3 hover:bg-gray-100 cursor-pointer text-[rgba(0,0,0,0.65)] font-sora text-[16px] font-semibold"
                    onClick={() => {
                      onChange && onChange(opt);
                      setIsOpen(false);
                    }}
                  >
                    {opt === "All" ? placeholder : opt}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px]">
            <input 
              type="text"
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold placeholder:font-sora placeholder:text-[rgba(0,0,0,0.65)]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
