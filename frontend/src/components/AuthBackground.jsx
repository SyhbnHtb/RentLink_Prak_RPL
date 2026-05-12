export default function AuthBackground({ children }) {
  return (
    <div className="bg-[#091413] min-h-screen w-full overflow-hidden relative flex items-center justify-center p-4 lg:p-8">
      {/* Background Orbs (Mendekati struktur asli Figma dengan filter blur agar halus) */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Orb 1 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[775px] w-[1920px] h-[1672px] rounded-[1920px] bg-[radial-gradient(50%50%at50%50%,rgba(61,102,71,0.50)0%,rgba(91,153,106,0.50)100%)] blur-[100px]"></div>
        {/* Orb 2 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[613px] w-[1920px] h-[1163px] rounded-[1920px] bg-[#3D6647] blur-[100px] opacity-60"></div>
        {/* Orb 3 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[809px] ml-[13px] w-[1920px] h-[960px] rounded-[1920px] bg-[#5B996A] blur-[100px] opacity-50"></div>
      </div>
      
      {/* Kontainer Utama */}
      <div className="relative z-10 w-full max-w-[1280px] flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
