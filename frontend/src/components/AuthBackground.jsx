/**
 * AuthBackground
 *
 * Komponen wrapper untuk halaman autentikasi (Login, Register, Verification).
 * Menampilkan background gelap dengan orbs hijau gradient.
 *
 * Props:
 * - `children` - Konten halaman auth (form, text, dll)
 *
 * Contoh penggunaan:
 * ```jsx
 * export default function LoginPage() {
 *   return (
 *     <AuthBackground>
 *       <div className="rounded-[45px] w-[1280px] h-[960px] ...">
 *         ... form login ...
 *       </div>
 *     </AuthBackground>
 *   );
 * }
 * ```
 */
export default function AuthBackground({ children }) {
  return (
    <div className="bg-[#091413] min-w-screen min-h-screen overflow-hidden relative">
      <div className="bg-[radial-gradient(49.96%49.96%at50%0%,rgba(64,138,113,0.20)50%,rgba(40,90,72,0.20)100%),radial-gradient(56.61%50.04%at50%49.96%,#408A7150%,#285A48100%)] w-full h-full absolute left-0 top-0 overflow-hidden">
        <div className="rounded-[1920px] bg-[radial-gradient(50%50%at50%50%,rgba(61,102,71,0.50)0%,rgba(91,153,106,0.50)100%)] w-full h-[1672px] absolute left-0 -top-[775px]"></div>
        <div className="rounded-[1920px] bg-[#3D6647] w-full h-[1163px] absolute left-0 -top-[613px]"></div>
        <div className="rounded-[1920px] bg-[#5B996A] w-full h-[960px] absolute left-[13px] -top-[809px]"></div>
      </div>
      {/* Container untuk konten auth agar berada di atas background */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
