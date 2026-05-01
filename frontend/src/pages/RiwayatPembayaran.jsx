import AdminLayout from "../components/AdminLayout";

export default function RiwayatPembayaran() {
  return (
    <AdminLayout title="Selamat Datang Kembali, Xianyinks!">
          <div className="flex flex-col items-start gap-[31px] w-full">
            <div className="grid w-full h-[120px]">
              <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full h-[118px]">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                    Tahun
                  </p>
                </div>
                <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 w-5 h-5 overflow-hidden relative "
                  >
                    <path
                      d="M9.22453 14.7071C9.61506 15.0976 10.2482 15.0976 10.6387 14.7071L17.0027 8.34315C17.3932 7.95262 17.3932 7.31946 17.0027 6.92893C16.6122 6.53841 15.979 6.53841 15.5885 6.92893L9.93164 12.5858L4.27479 6.92893C3.88426 6.53841 3.2511 6.53841 2.86057 6.92893C2.47005 7.31946 2.47005 7.95262 2.86057 8.34315L9.22453 14.7071ZM9.93164 12H8.93164V14H9.93164H10.9316V12H9.93164Z"
                      fill="black"
                      fillOpacity="0.65"
                    />
                  </svg>
                  <p className="shrink-0 text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-[202px]">
                    Pilih Tahun Tagihan...
                  </p>
                </div>
              </div>
              <div className="flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                    Search
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <div className="flex py-2 px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-[309px]">
                    <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                      Cari Tagihan...
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full h-[118px]">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                    SORT
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
                    Urutkan Pembayaran...
                  </p>
                </div>
              </div>
              <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-[361px] h-[118px]">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                    Bulan
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
                    <g clipPath="url(#clip0_27_72)">
                      <path
                        d="M7.22453 14.7071C7.61506 15.0976 8.24822 15.0976 8.63875 14.7071L15.0027 8.34315C15.3932 7.95262 15.3932 7.31946 15.0027 6.92893C14.6122 6.53841 13.979 6.53841 13.5885 6.92893L7.93164 12.5858L2.27479 6.92893C1.88426 6.53841 1.2511 6.53841 0.860573 6.92893C0.470048 7.31946 0.470048 7.95262 0.860573 8.34315L7.22453 14.7071ZM7.93164 12H6.93164V14H7.93164H8.93164V12H7.93164Z"
                        fill="black"
                        fillOpacity="0.65"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_27_72">
                        <rect width="16" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                    Pilih Bulan...
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center rounded-xl bg-[#F9FAFB] w-[1496px] overflow-hidden">
              <div className="flex flex-col items-start w-fit h-[472px]">
                <div className="flex py-2 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    ID{" "}
                  </p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-[181px] h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    INV-002
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-fit h-[472px]">
                <div className="flex py-2 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-fit h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Nama Unit
                  </p>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-[135px] h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Kamar 102
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start shrink-0 w-[300px] h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Penyewa Unit
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Nasir
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-full h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Tanggal Dibayar
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    7 April 2026
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start w-full h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Total
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <p className="text-[#285A48] font-roboto text-xl w-fit">
                    Rp 2.055.216,-
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start shrink-0 w-[140px] h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Status
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#8F8383] w-fit">
                    <p className="text-[#FFF] font-roboto text-xl w-fit">
                      Selesai
                    </p>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start rounded-[20px] w-fit h-[472px]">
                <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                  <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                    Opsi
                  </p>
                  <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                </div>
                <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                  <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Detail
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
  );
}
