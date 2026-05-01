import AuthBackground from "../components/AuthBackground";

export default function Login_page() {
  return (
    <AuthBackground>
      <div className="rounded-[45px] w-[1280px] h-[960px] absolute left-80 top-[60px] overflow-hidden">
        <div className="bg-[rgba(217,217,217,0.20)] shadow-[04px4px0rgba(0,0,0,0.25)] w-[1271px] h-[959px] absolute -left-0.5 top-px"></div>
        <div className="rounded-[40px] bg-[radial-gradient(198.87%100%at50%0%,#0914130%,#408A71100%)] shadow-[04px4px0rgba(0,0,0,0.25)] w-[862px] h-[960px] absolute left-[418px] top-0"></div>
        <div className="flex flex-col items-center gap-[47px] w-[839px] absolute left-[441px] top-[104px]">
          <p className="text-[#FBF8F3] font-roboto text-5xl font-bold leading-[0.908em] w-[360px] h-16 text-center tracking-[0.15em]">
            Login
          </p>
          <div className="w-[560px] h-[88px] relative">
            <p className="text-[#FBF8F3] font-roboto text-xl font-bold leading-[0.908em] w-[418px] h-6 absolute left-[3px] top-0 tracking-[0.15em]">
              Username
            </p>
            <svg
              width="560"
              height="56"
              viewBox="0 0 560 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[560px] h-14 absolute left-0 top-8 "
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H550C555.523 0 560 4.47715 560 10V46C560 51.5229 555.523 56 550 56H10C4.47715 56 0 51.5228 0 46V10Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start gap-[5px] w-[560px]">
            <p className="text-[#FBF8F3] font-roboto text-xl font-bold leading-[0.908em] w-full h-6 tracking-[0.15em]">
              Email
            </p>
            <svg
              width="560"
              height="56"
              viewBox="0 0 560 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[560px] h-14 "
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H550C555.523 0 560 4.47715 560 10V46C560 51.5229 555.523 56 550 56H10C4.47715 56 0 51.5228 0 46V10Z"
                fill="#D9D9D9"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start gap-[5px] w-[560px]">
            <p className="text-[#FBF8F3] font-roboto text-xl font-bold leading-[0.908em] w-full h-6 tracking-[0.15em]">
              Password
            </p>
            <div className="flex py-[7px] px-[9px] justify-end items-center gap-2.5 rounded-[10px] bg-[#D9D9D9] w-full h-14">
              <img
                src="/ShowIcon.png"
                className="w-[41px] h-[42px] max-w-none"
                alt="Show Icon"
              />
            </div>
          </div>
          <div className="w-[560px] h-20 relative">
            <p className="text-[#FBF8F3] font-roboto text-xl font-bold leading-[0.908em] w-[418px] h-6 absolute left-[3px] top-0 tracking-[0.15em]">
              Confirm Password
            </p>
            <svg
              width="560"
              height="56"
              viewBox="0 0 560 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[560px] h-14 absolute left-0 top-6 "
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H550C555.523 0 560 4.47715 560 10V46C560 51.5229 555.523 56 550 56H10C4.47715 56 0 51.5228 0 46V10Z"
                fill="#D9D9D9"
              />
            </svg>
            <img
              src="/ShowIcon(1).png"
              className="w-[41px] h-[42px] absolute left-[551px] top-[31px] max-w-none"
              alt="Show Icon"
            />
          </div>
          <div className="w-[301px] h-14 relative">
            <svg
              width="300"
              height="56"
              viewBox="0 0 300 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[300px] h-14 absolute left-px top-0 "
            >
              <path
                d="M0 10C0 4.47715 4.47715 0 10 0H290C295.523 0 300 4.47715 300 10V46C300 51.5229 295.523 56 290 56H10C4.47716 56 0 51.5228 0 46V10Z"
                fill="#B0E4CC"
              />
            </svg>
            <p className="flex flex-col justify-center text-[#FBF8F3] font-roboto text-4xl font-bold leading-[0.908em] w-[300px] h-14 absolute left-0 top-0 text-center tracking-[0.15em]">
              Login
            </p>
          </div>
          <p className="text-[#004DFF] font-roboto text-base font-bold w-80">
            Don’t have an Account? Register here Having trouble? Help
          </p>
        </div>
      </div>
    </AuthBackground>
  );
}
