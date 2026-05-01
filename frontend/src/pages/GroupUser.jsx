export default function GroupUser() {
  return (
    <div className="min-w-screen min-h-screen">
      <div className="inline-flex items-center gap-[17px] absolute left-[1976px] top-[484px]">
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#DC3545] absolute left-0 top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Disapproved</p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#1A7A45] absolute left-[152px] top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Approved</p>
        </button>
      </div>
      <div className="inline-flex items-center gap-4 absolute left-[1976px] top-[385px]">
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#DC3545] absolute left-0 top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Belum Bayar</p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#FDC262] absolute left-[152px] top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Pending</p>
        </button>
        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#8F8383] absolute left-[265px] top-0">
          <p className="text-[#FFF] font-roboto text-xl w-fit">Selesai</p>
        </button>
      </div>
      <div className="flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] absolute left-[2381px] top-0">
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              INV-ID
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              INV-001
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Unit
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              102
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Biaya Sewa
            </p>
          </div>
          <div className="flex items-start w-full">
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#285A48] font-sora text-base font-semibold w-[120px]">
                Periode &#40;hari&#41; Kamar Listrik Air Total
              </p>
            </div>
            <div className="flex flex-col items-end w-full">
              <p className="text-[#285A48] font-sora text-base font-semibold w-[180px] text-right">
                10 hari 2.000.000,- 20.216,- 35.000,- 2.055.216,-
              </p>
            </div>
          </div>
        </div>
        <div className="flex py-[15px] px-[22px] items-center gap-[15px] rounded-[12.3px] bg-[#B0E4CC] w-full h-[81px]">
          <div className="flex justify-center items-center rounded-[29.3px] bg-[#408A71] w-[59px] h-[59px]">
            <svg
              width="44"
              height="41"
              viewBox="0 0 44 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0 w-11 h-[41px] overflow-hidden relative "
            >
              <path
                d="M25.6659 3.41666H10.9992C8.98252 3.41666 7.33252 4.95416 7.33252 6.83332V34.1667C7.33252 36.0458 8.96419 37.5833 10.9992 37.5833H32.9992C35.0159 37.5833 36.6659 36.0458 36.6659 34.1667V13.6667L25.6659 3.41666ZM29.3325 30.75H14.6659V27.3333H29.3325V30.75ZM29.3325 23.9167H14.6659V20.5H29.3325V23.9167ZM23.8325 15.375V5.97916L33.9159 15.375H23.8325Z"
                fill="#B0E4CC"
                fillOpacity="0.7"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#285A48] font-plusJakartaSans text-[15px] font-semibold w-fit">
                Choose File or Drag File
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#408A71] font-plusJakartaSans text-xs w-fit">
                File Type: PDF
              </p>
            </div>
          </div>
        </div>
        <button className="cursor-pointer text-nowrap flex py-[9px] px-[22px] justify-center items-center gap-3 rounded-[30.9px] border-[1.54px] border-[rgba(255,255,255,0.35)] bg-linear-[0deg,rgba(0,0,0,0.20)0%,rgba(0,0,0,0.20)100%),#28A74] w-full">
          <p className="text-[#FFF] font-sora text-[19px] font-semibold w-fit">
            Kirim
          </p>
        </button>
      </div>
      <div className="flex p-2.5 flex-col items-start gap-2.5 rounded-[12.3px] border-2 border-[#B0E4CC] bg-[#FFF] w-[359px] absolute left-[1971px] top-px">
        <div className="flex py-[15px] px-[22px] items-center gap-[15px] rounded-[12.3px] bg-[#B0E4CC] w-full h-[81px]">
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
                d="M15.4361 15.4352C18.909 15.4352 21.6101 12.734 21.6101 9.26113C21.6101 5.78821 18.909 3.08705 15.4361 3.08705C11.9631 3.08705 9.26197 5.78821 9.26197 9.26113C9.26197 12.734 11.9631 15.4352 15.4361 15.4352ZM15.4361 18.5223C11.32 18.5223 3.08789 20.5803 3.08789 24.6963V27.7834H27.7842V24.6963C27.7842 20.5803 19.5521 18.5223 15.4361 18.5223Z"
                fill="#C5D9EA"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start w-fit">
            <div className="flex flex-col items-start w-full">
              <p className="text-[#285A48] font-plusJakartaSans text-xl font-semibold w-fit">
                Nasir
              </p>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#408A71] font-plusJakartaSans text-base w-fit">
                KingNasir
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              INV-ID
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              INV-001
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Unit
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              102
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Biaya Sewa
            </p>
          </div>
          <div className="flex items-start w-full">
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#285A48] font-sora text-base font-semibold w-[120px]">
                Periode &#40;hari&#41; Kamar Listrik Air Total
              </p>
            </div>
            <div className="flex flex-col items-end w-full">
              <p className="text-[#285A48] font-sora text-base font-semibold w-[180px] text-right">
                10 hari 2.000.000,- 20.216,- 35.000,- 2.055.216,-
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start w-[332px]">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#408A71] font-plusJakartaSans text-xs font-medium w-full tracking-[0.0342em]">
              Dibayar Pada
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#285A48] font-sora text-base font-semibold w-full">
              07&#x2F;04&#x2F;2026
            </p>
          </div>
        </div>
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
                    d="M15.4361 15.4352C18.909 15.4352 21.6101 12.7341 21.6101 9.26113C21.6101 5.78821 18.909 3.08705 15.4361 3.08705C11.9631 3.08705 9.26197 5.78821 9.26197 9.26113C9.26197 12.7341 11.9631 15.4352 15.4361 15.4352ZM15.4361 18.5223C11.32 18.5223 3.08789 20.5803 3.08789 24.6963V27.7834H27.7842V24.6963C27.7842 20.5803 19.5521 18.5223 15.4361 18.5223Z"
                    fill="#B0E4CC"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#408A71] font-plusJakartaSans text-[15px] w-fit">
                  Nasir User_Email@ddress
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-[25px] px-3 flex-col items-start gap-1.5 w-[340px]">
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
                  d="M3.08643 13.3772H11.3185V3.08704H3.08643V13.3772ZM3.08643 21.6093H11.3185V15.4352H3.08643V21.6093ZM13.3766 21.6093H21.6087V11.3191H13.3766V21.6093ZM13.3766 3.08704V9.26112H21.6087V3.08704H13.3766Z"
                  fill="#B0E4CC"
                />
              </svg>
              <p className="text-[#B0E4CC] font-plusJakartaSans text-xl font-medium w-fit">
                Dashboard
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
              Selamat Datang Kembali, Nasir!
            </p>
          </div>
          <div className="flex items-start gap-[31px] w-full">
            <div className="flex flex-col items-start gap-[15px] w-full">
              <div className="grid w-full h-[120px]">
                <div className="flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Status Pembayaran
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#1A7A45] w-fit">
                      <p className="text-[#FFF] font-roboto text-xl w-fit">
                        Approved
                      </p>
                    </button>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      TOTAL TAGIHAN
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      Rp 2.055.216,-
                    </p>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Tagihan Aktif
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      INV-001
                    </p>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Unit
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      Kamar 102
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex py-1 px-0 flex-col items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-plusJakartaSans text-[22px] font-semibold w-full">
                      Ringkasan Pembayaran
                    </p>
                  </div>
                </div>
                <div className="flex pt-7 pr-[31px] pb-7 pl-[31px] flex-col justify-center items-center rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex items-start rounded-xl bg-[#F9FAFB] w-full h-[72px] overflow-hidden">
                    <div className="flex flex-col items-start w-[200px] h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          ID Invoice
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          INV-001
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Nama Unit
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          Kamar 102
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-40 h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Lantai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          1
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[180px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Tanggal Mulai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-60 h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          1 April 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[180px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Tanggal Selesai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          11 April 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Status
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#8F8383] w-fit">
                          <p className="text-[#FFF] font-roboto text-xl w-fit">
                            Selesai
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-start rounded-[20px] w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Actions
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#285A48] font-roboto text-xl w-fit">
                            Detail
                          </p>
                        </div>
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#3B82F6] font-roboto text-xl w-fit">
                            Bayar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex py-1 px-0 flex-col items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-plusJakartaSans text-[22px] font-semibold w-full">
                      Riwayat Pembayaran
                    </p>
                  </div>
                </div>
                <div className="flex pt-7 pr-[31px] pb-7 pl-[31px] flex-col items-start rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex items-start rounded-xl bg-[#F9FAFB] w-full h-[72px] overflow-hidden">
                    <div className="flex flex-col items-start w-[200px] h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          ID Invoice
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          INV-001
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Nama Unit
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          Kamar 102
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-40 h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Lantai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          1
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[180px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Tanggal Mulai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-60 h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          1 April 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[180px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-60 h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Tanggal Selesai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 shrink-0 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          11 April 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Status
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <button className="cursor-pointer text-nowrap flex py-1 px-3 justify-center items-center gap-2.5 rounded-xl bg-[#8F8383] w-fit">
                          <p className="text-[#FFF] font-roboto text-xl w-fit">
                            Selesai
                          </p>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-start rounded-[20px] w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Actions
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#285A48] font-roboto text-xl w-fit">
                            Detail
                          </p>
                        </div>
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#3B82F6] font-roboto text-xl">
                            {" "}
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
      </div>
    </div>
  );
}
