import AdminLayout from "../components/AdminLayout";

export default function ManajemenMeteran() {
  return (
    <>
      <div className="flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] absolute left-[1976px] top-0">
        <div className="flex flex-col items-start w-[309px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              uNIT
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              102
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[309px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Listrik &#40;kWh&#41;
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              Masukkan Meteran...
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[309px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Air &#40;m³&#41;
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              Masukkan Metran...
            </p>
          </div>
        </div>
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-linear-[0deg,rgba(0,0,0,0.20)0%,rgba(0,0,0,0.20)100%),rgba(255,255,255,0.22] w-full">
          <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
            Simpan
          </p>
        </button>
      </div>
    <AdminLayout title="Selamat Datang Kembali, Xianyinks!">
          <div className="grid w-full h-[120px]">
            <div className="flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                  Search
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px]">
                  <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                    Cari Unit...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full h-[118px]">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                  Lantai{" "}
                </p>
              </div>
              <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px]">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-4 h-5 overflow-hidden relative "
                >
                  <path
                    d="M7.22453 14.7071C7.61506 15.0976 8.24822 15.0976 8.63875 14.7071L15.0027 8.34315C15.3932 7.95262 15.3932 7.31946 15.0027 6.92893C14.6122 6.53841 13.979 6.53841 13.5885 6.92893L7.93164 12.5858L2.27479 6.92893C1.88426 6.53841 1.2511 6.53841 0.860573 6.92893C0.470048 7.31946 0.470048 7.95262 0.860573 8.34315L7.22453 14.7071ZM7.93164 12H6.93164V14H7.93164H8.93164V12H7.93164Z"
                    fill="black"
                    fillOpacity="0.65"
                  />
                </svg>
                <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                  Lantai x
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 rounded-2xl bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-fit overflow-hidden">
            <div className="flex justify-center items-center bg-[#F9FAFB] w-fit overflow-hidden">
              <div className="flex flex-col items-start w-80 h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-80 h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Nama Unit
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-80 h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Kamar 201
                  </p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-80 h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Kamar 102
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-60 h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Lantai
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-60 h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">2</p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-60 h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">1</p>
                </div>
              </div>
              <div className="flex flex-col items-start w-[300px] h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Penyewa Unit
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Rusdi
                  </p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Nasir
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-40 h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Listrik &#40;kWh&#41;
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">-</p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">14</p>
                </div>
              </div>
              <div className="flex flex-col items-start w-40 h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Air &#40;m³&#41;{" "}
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">-</p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">7</p>
                </div>
              </div>
              <div className="flex flex-col items-start w-[179px] h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Total
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Rp -
                  </p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Rp 55.216,-
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start rounded-[20px] w-fit h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Opsi
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                  <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Edit
                    </p>
                  </div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Edit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
    </>
  );
}
