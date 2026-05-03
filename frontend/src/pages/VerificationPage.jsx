import AuthBackground from "../components/AuthBackground";

export default function VerificationPage() {
  return (
    <AuthBackground>
      {/* Main Card Container */}
      <div className="flex w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden min-h-[700px] bg-[rgba(217,217,217,0.20)] backdrop-blur-md">
        
        {/* Left Side: Transparent/Glass */}
        <div className="hidden md:block w-[40%] bg-transparent relative">
          {/* Glassmorphism effect is handled by parent backdrop-blur */}
        </div>
        
        {/* Right Side: Content */}
        <div className="w-full md:w-[60%] bg-[radial-gradient(198.87%100%at50%0%,#0914130%,#408A71100%)] p-12 flex flex-col justify-center items-center relative shadow-[-10px_0_20px_rgba(0,0,0,0.1)] rounded-l-[40px] md:rounded-l-[40px] rounded-[40px] border-l border-white/10">
          
          <h1 className="text-[#FBF8F3] font-roboto text-4xl md:text-5xl font-bold tracking-[0.15em] text-center mb-12 leading-tight">
            Please Verify<br />Your Account
          </h1>
          
          <div className="max-w-md mx-auto w-full flex flex-col items-center">
            
            <p className="text-[#FBF8F3] font-roboto text-sm md:text-base font-bold text-center tracking-[0.1em] mb-8 leading-relaxed">
              Enter the Six Digit Code We Send to Your Email Address to Verify Your Account
            </p>
            
            {/* OTP Inputs */}
            <div className="flex justify-center items-center gap-2 md:gap-4 mb-12 w-full">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input 
                  key={index}
                  type="text" 
                  maxLength={1}
                  className="w-10 h-14 md:w-14 md:h-16 bg-[#D9D9D9] rounded-[10px] text-center text-black text-2xl font-bold outline-none focus:ring-2 focus:ring-[#B0E4CC]"
                />
              ))}
            </div>
            
            {/* Submit Button */}
            <div className="w-full flex justify-center mb-8">
              <button 
                type="button" 
                className="w-[300px] h-14 bg-[#B0E4CC] rounded-[10px] flex justify-center items-center text-[#FBF8F3] font-roboto text-3xl font-bold tracking-[0.15em] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#8ecba9] transition-colors"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Verify
              </button>
            </div>
            
            {/* Links */}
            <div className="text-center flex flex-col items-center gap-2">
              <p className="text-[#FBF8F3] font-roboto text-sm font-bold">
                Not receive any verification code? <a href="#" className="text-[#3B82F6] hover:underline">Click here</a> to resend the code
              </p>
              <p className="text-[#FBF8F3] font-roboto text-sm font-bold">
                Having trouble? <a href="#" className="text-[#3B82F6] hover:underline">Help</a>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </AuthBackground>
  );
}