export default function ManagementUnit() {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="inline-flex items-center gap-4 absolute left-[1976px] top-[250px]">
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#DC3545] absolute left-0 top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Terisi</p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#1A7A45] absolute left-[89px] top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Tersedia</p>
        </button>
      </div>
      <div className="flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] absolute left-[2391px] top-0">
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.22)] w-full">
          <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
            Hapus Unit?
          </p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-linear-[0deg,rgba(0,0,0,0.20)0%,rgba(0,0,0,0.20)100%),#DC354] w-full">
          <p className="text-[#FFF] font-sora text-[19px] font-semibold w-fit">
            Hapus
          </p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-linear-[0deg,rgba(0,0,0,0.20)0%,rgba(0,0,0,0.20)100%),#28A74] w-full">
          <p className="text-[#FFF] font-sora text-[19px] font-semibold w-fit">
            Batal
          </p>
        </button>
      </div>
      <div className="flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] absolute left-[1976px] top-0">
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Nama Unit
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              ...
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Lantai Unit
            </p>
          </div>
          <div className="flex py-[5px] px-[19px] items-center gap-[9px] rounded-[30.9px] bg-[rgba(63,63,63,0.10)] w-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M9.22453 14.7071C9.61506 15.0976 10.2482 15.0976 10.6387 14.7071L17.0027 8.34315C17.3932 7.95262 17.3932 7.31946 17.0027 6.92893C16.6122 6.53841 15.979 6.53841 15.5885 6.92893L9.93164 12.5858L4.27479 6.92893C3.88426 6.53841 3.2511 6.53841 2.86057 6.92893C2.47005 7.31946 2.47005 7.95262 2.86057 8.34315L9.22453 14.7071ZM9.93164 12H8.93164V14H9.93164H10.9316V12H9.93164Z"
                fill="black"
                fillOpacity="0.65"
              />
            </svg>
            <p className="flex flex-col justify-center text-[rgba(0,0,0,0.65)] font-roboto text-base font-semibold w-[167px] h-5">
              Pilih Lantai...
            </p>
          </div>
        </div>
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-linear-[0deg,rgba(0,0,0,0.20)0%,rgba(0,0,0,0.20)100%),rgba(255,255,255,0.22] w-full">
          <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
            Buat Unit
          </p>
        </button>
      </div>
      <div className="inline-flex justify-center items-start bg-[#FFF] w-[1920px] h-full absolute left-0 top-0 overflow-hidden">
        <div className="flex min-h-[926.112px] flex-col items-start bg-linear-[180deg,#285A480%,#091413100%] w-[340px] h-full absolute left-0 top-0">
          <div className="flex pt-[43px] pr-[37px] pb-[31px] pl-[37px] flex-col items-start w-full">
            <p className="text-[#FFF] font-sora text-[31px] font-semibold w-full tracking-[0.01em]">
              Dashboard
            </p>
          </div>
          <div className="flex py-0 px-3 flex-col items-start w-full">
            <div className="flex pt-[19px] pr-[25px] pb-[31px] pl-[25px] items-center gap-[15px] border-b-[1.54px] border-b-[rgba(255,255,255,0.12)] w-full">
              <div className="flex justify-center items-center rounded-[29.3px] bg-[#408A71] w-[59px] h-[59px]">
                <svg
                  width="31"
                  height="31"
                  viewBox="0 0 31 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 w-[31px] h-[31px] overflow-hidden relative "
                >
                  <path
                    d="M15.4361 15.4353C18.909 15.4353 21.6101 12.7342 21.6101 9.26124C21.6101 5.78832 18.909 3.08716 15.4361 3.08716C11.9631 3.08716 9.26197 5.78832 9.26197 9.26124C9.26197 12.7342 11.9631 15.4353 15.4361 15.4353ZM15.4361 18.5224C11.32 18.5224 3.08789 20.5804 3.08789 24.6964V27.7835H27.7842V24.6964C27.7842 20.5804 19.5521 18.5224 15.4361 18.5224Z"
                    fill="#B0E4CC"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#408A71] font-plusJakartaSans text-[15px] w-fit">
                  XianyinksDelEsol User_Email@ddress
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-[25px] px-3 flex-col items-start gap-1.5 w-[340px]">
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M3.08643 13.3773H11.3185V3.08716H3.08643V13.3773ZM3.08643 21.6094H11.3185V15.4353H3.08643V21.6094ZM13.3766 21.6094H21.6087V11.3193H13.3766V21.6094ZM13.3766 3.08716V9.26124H21.6087V3.08716H13.3766Z"
                  fill="#B0E4CC"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-[rgba(176,228,204,0.70)] font-plusJakartaSans text-xl font-medium w-fit">
                Dashboard
              </p>
            </div>
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] bg-[rgba(255,255,255,0.10)] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M3.08643 13.3773H11.3185V3.08716H3.08643V13.3773ZM3.08643 21.6094H11.3185V15.4353H3.08643V21.6094ZM13.3766 21.6094H21.6087V11.3193H13.3766V21.6094ZM13.3766 3.08716V9.26124H21.6087V3.08716H13.3766Z"
                  fill="#B0E4CC"
                />
              </svg>
              <p className="text-[#B0E4CC] font-plusJakartaSans text-xl font-medium w-fit">
                Manajemen Unit
              </p>
            </div>
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M3.08643 13.3773H11.3185V3.08716H3.08643V13.3773ZM3.08643 21.6094H11.3185V15.4353H3.08643V21.6094ZM13.3766 21.6094H21.6087V11.3193H13.3766V21.6094ZM13.3766 3.08716V9.26124H21.6087V3.08716H13.3766Z"
                  fill="#B0E4CC"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-[rgba(176,228,204,0.70)] font-plusJakartaSans text-xl font-medium w-fit">
                Manajemen Kontrak
              </p>
            </div>
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M3.08643 13.3773H11.3185V3.08716H3.08643V13.3773ZM3.08643 21.6094H11.3185V15.4353H3.08643V21.6094ZM13.3766 21.6094H21.6087V11.3193H13.3766V21.6094ZM13.3766 3.08716V9.26124H21.6087V3.08716H13.3766Z"
                  fill="#B0E4CC"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-[rgba(176,228,204,0.70)] font-plusJakartaSans text-xl font-medium w-fit">
                Manajemen Meteran
              </p>
            </div>
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M14.4059 2.05811H6.17375C5.04183 2.05811 4.11572 2.98422 4.11572 4.11613V20.5804C4.11572 21.7123 5.03154 22.6384 6.17375 22.6384H18.5219C19.6538 22.6384 20.5799 21.7123 20.5799 20.5804V8.23219L14.4059 2.05811ZM16.4639 18.5223H8.23178V16.4643H16.4639V18.5223ZM16.4639 14.4063H8.23178V12.3482H16.4639V14.4063ZM13.3768 9.2612V3.60163L19.0364 9.2612H13.3768Z"
                  fill="#B0E4CC"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-[rgba(176,228,204,0.70)] font-plusJakartaSans text-xl font-medium w-fit">
                Tagihan &amp; Pembayaran
              </p>
            </div>
            <div className="flex py-[15px] px-[25px] items-center gap-[15px] rounded-[12.3px] w-full">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[25px] h-[25px] overflow-hidden relative "
              >
                <path
                  d="M14.4059 2.05811H6.17375C5.04183 2.05811 4.11572 2.98422 4.11572 4.11613V20.5804C4.11572 21.7123 5.03154 22.6384 6.17375 22.6384H18.5219C19.6538 22.6384 20.5799 21.7123 20.5799 20.5804V8.23219L14.4059 2.05811ZM16.4639 18.5223H8.23178V16.4643H16.4639V18.5223ZM16.4639 14.4063H8.23178V12.3482H16.4639V14.4063ZM13.3768 9.2612V3.60163L19.0364 9.2612H13.3768Z"
                  fill="#B0E4CC"
                  fillOpacity="0.7"
                />
              </svg>
              <p className="text-[rgba(176,228,204,0.70)] font-plusJakartaSans text-xl font-medium w-fit">
                Riwayat Transaksi
              </p>
            </div>
            <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] flex-col justify-center items-center rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-[rgba(255,255,255,0.22)] w-[315px]">
              <p className="text-[#FFF] font-arial text-xl font-bold w-fit">
                Logout
              </p>
            </button>
          </div>
        </div>
        <div className="flex min-w-[1580.426px] pt-[43px] pr-[43px] pb-[43px] pl-[37px] flex-col items-start gap-[31px] bg-[#FFF] h-full absolute left-[340px] top-0 overflow-hidden">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-[34px] font-semibold w-fit">
              Selamat Datang Kembali, Xianyinks!
            </p>
          </div>
          <div className="flex flex-col items-center gap-[31px] w-full">
            <div className="flex flex-col items-start gap-[15px] w-full">
              <div className="grid w-full h-[120px]">
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col justify-center items-center gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#ECECEC] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#285A48] font-sora text-[28px] font-semibold w-full text-center">
                      + Tambah Unit
                    </p>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] w-full h-[118px]">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#408A71] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Status
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
                    <p className="text-[rgba(0,0,0,0.65)] font-sora text-[19px] font-semibold w-fit">
                      Pilih Status Unit...
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
            </div>
            <div className="flex flex-col justify-center items-center gap-4 rounded-2xl bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-fit overflow-hidden">
              <div className="flex justify-center items-center bg-[#F9FAFB] w-fit overflow-hidden">
                <div className="flex flex-col items-start w-[360px] h-[472px]">
                  <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                    <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                      Nama Unit
                    </p>
                    <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Kamar 201
                    </p>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Kamar 102
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[300px] h-[472px]">
                  <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-[300px] h-8">
                    <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                      Lantai
                    </p>
                    <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-[300px] h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      2
                    </p>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-[300px] h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      1
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-60 h-[472px]">
                  <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                    <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                      Harga{" "}
                    </p>
                    <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-60 h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Rp 200.000,-
                    </p>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-60 h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      Rp 200.000,-
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-[140px] h-[472px]">
                  <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                    <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                      Status
                    </p>
                    <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                    <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#BF3B3B] w-fit">
                      <p className="text-[#FFF] font-roboto text-xl w-fit">
                        Terisi
                      </p>
                    </button>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                    <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#28A745] w-fit">
                      <p className="text-[#FFF] font-roboto text-xl w-fit">
                        Tersedia
                      </p>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start w-fit h-[472px]">
                  <div className="flex py-2 px-5 justify-between items-center shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                    <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                      Tanggal Dibuat
                    </p>
                    <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-60 h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      11 September 2023
                    </p>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-60 h-10">
                    <p className="text-[#285A48] font-roboto text-xl w-fit">
                      1 April 2022
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
                    <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                      <p className="text-[#DC3545] font-roboto text-xl w-fit">
                        Hapus
                      </p>
                    </div>
                  </div>
                  <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                    <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                      <p className="text-[#285A48] font-roboto text-xl w-fit">
                        Edit
                      </p>
                    </div>
                    <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                      <p className="text-[#DC3545] font-roboto text-xl w-fit">
                        Hapus
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
