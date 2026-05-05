import AuthBackground from "../components/AuthBackground";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan Confirm Password tidak cocok.");
      return;
    }
    if (!username || !email || !password) {
      setError("Semua field harus diisi.");
      return;
    }

    setLoading(true);
    const result = await register({ username, email, password, confirmPassword });
    setLoading(false);

    if (result.success) {
      navigate("/verification");
    } else {
      setError(result.message);
    }
  };

  return (
    <AuthBackground>
      {/* Main Card Container */}
      <div className="flex w-full max-w-6xl rounded-[45px] shadow-2xl overflow-hidden min-h-[750px] bg-white/20 backdrop-blur-md">
        
        {/* Left Side: Transparent/Glass */}
        <div className="hidden lg:block w-[40%] bg-transparent relative">
          {/* Glassmorphism effect is handled by parent backdrop-blur */}
        </div>
        
        {/* Right Side: Form Content */}
        <div className="w-full lg:w-[60%] bg-[radial-gradient(198.87%_100%_at_50%_0%,#091413_0%,#408A71_100%)] p-10 md:p-16 flex flex-col justify-center items-center relative shadow-[-10px_0_20px_rgba(0,0,0,0.1)] rounded-[45px] lg:rounded-l-[45px] border-l border-white/10">
          
          <h1 className="text-[#FBF8F3] font-sans text-[48px] font-bold tracking-[0.15em] text-center mb-10">
            Create Account
          </h1>
          
          <form className="w-full max-w-[480px] flex flex-col gap-6" onSubmit={handleRegister}>
            
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-[#FBF8F3] font-sans text-xl font-bold tracking-[0.15em] ml-1">
                Username
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 bg-[#D9D9D9] rounded-xl px-5 text-gray-900 outline-none focus:ring-2 focus:ring-secondary font-sans text-lg"
              />
            </div>
            
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[#FBF8F3] font-sans text-xl font-bold tracking-[0.15em] ml-1">
                Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-[#D9D9D9] rounded-xl px-5 text-gray-900 outline-none focus:ring-2 focus:ring-secondary font-sans text-lg"
              />
            </div>
            
            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[#FBF8F3] font-sans text-xl font-bold tracking-[0.15em] ml-1">
                Password
              </label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-14 bg-[#D9D9D9] rounded-xl px-5 pr-14 text-gray-900 outline-none focus:ring-2 focus:ring-secondary font-sans text-lg"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-800 transition-colors"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><path d="m2 2 20 20"/></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-800 transition-colors"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[#FBF8F3] font-sans text-xl font-bold tracking-[0.15em] ml-1">
                Confirm Password
              </label>
              <div className="relative w-full">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-14 bg-[#D9D9D9] rounded-xl px-5 pr-14 text-gray-900 outline-none focus:ring-2 focus:ring-secondary font-sans text-lg"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-800 transition-colors"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><path d="m2 2 20 20"/></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 hover:text-gray-800 transition-colors"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-xl px-4 py-3 text-center">
                <p className="text-red-200 font-sans font-semibold text-sm">{error}</p>
              </div>
            )}
            
            {/* Submit Button */}
            <div className="flex justify-center mt-2">
              <button 
                type="submit"
                disabled={loading}
                className="w-[300px] h-14 bg-secondary rounded-[10px] flex justify-center items-center text-[#FBF8F3] font-sans text-3xl font-bold tracking-[0.15em] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] hover:bg-secondary-hover transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.3)" }}
              >
                Register
              </button>
            </div>
            
            {/* Links */}
            <div className="mt-6 text-center flex flex-col items-center gap-1">
              <p className="text-[#004DFF] font-sans text-base font-bold">
                Already have an Account? <Link to="/login" className="hover:underline">Sign in here</Link>
              </p>
              <p className="text-[#004DFF] font-sans text-base font-bold">
                Having trouble? <a href="#" className="hover:underline">Help</a>
              </p>
            </div>
            
          </form>
        </div>
      </div>
    </AuthBackground>
  );
}
