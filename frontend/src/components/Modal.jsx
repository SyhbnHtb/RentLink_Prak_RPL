import { useEffect, useRef } from "react";

/**
 * Modal
 *
 * Komponen wrapper untuk pop-up modal.
 *
 * Props:
 * - `isOpen`   - boolean untuk menentukan apakah modal terbuka
 * - `onClose`  - fungsi yang dipanggil saat area luar atau tombol close diklik
 * - `children` - konten di dalam modal
 * - `className` - class tambahan untuk kotak modal
 */
export default function Modal({ isOpen, onClose, children, className = "" }) {
  const modalRef = useRef(null);

  // Tutup modal saat tombol Escape ditekan
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Tutup modal saat area luar (backdrop) diklik
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-2xl relative w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
