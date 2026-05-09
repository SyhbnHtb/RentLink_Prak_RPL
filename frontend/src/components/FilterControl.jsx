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
      className={`bg-surface border border-gray-100 shadow-sm rounded-2xl p-4 flex flex-col gap-2 w-full ${className}`}
    >
      <div className="flex flex-col items-start w-full">
        <label className="text-primary font-sans text-sm font-medium uppercase tracking-wide">
          {label}
        </label>
      </div>
      <div className="flex flex-col items-start w-full relative" ref={dropdownRef}>
        {type === "select" ? (
          <>
            <div 
              className="bg-gray-100 rounded-full px-4 py-2 flex items-center justify-between gap-2 cursor-pointer w-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {iconSize === "large" ? (
                  <ChevronDownIconLg fill="black" fillOpacity="0.65" className="shrink-0" />
                ) : (
                  <ChevronDownIcon fill="black" fillOpacity="0.65" className="shrink-0" />
                )}
                <span className="text-gray-600 font-sans font-medium truncate">
                  {value && value !== "All" ? value : placeholder}
                </span>
              </div>
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden max-h-[250px] overflow-y-auto">
                {options.map((opt) => (
                  <div
                    key={opt}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 font-sans font-medium"
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
          <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center w-full">
            <input 
              type="text"
              placeholder={placeholder}
              value={value || ""}
              onChange={(e) => onChange && onChange(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-600 font-sans font-medium placeholder:text-gray-400 placeholder:font-sans"
            />
          </div>
        )}
      </div>
    </div>
  );
}
