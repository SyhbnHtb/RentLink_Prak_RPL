import AdminLayout from "../components/AdminLayout";

export default function DashboardAdmin() {
  return (
    <AdminLayout title="Selamat Datang Kembali, Xianyinks!">
          <div className="flex items-start gap-[31px] w-full">
            <div className="flex flex-col items-start gap-[15px] w-full">
              <div className="grid w-full h-[120px]">
                <div className="flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      pembayaran pending
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      xx Unit
                    </p>
                  </div>
                </div>
                <div className="flex py-[22px] px-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Tagihan aktif
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      xx Tagihan
                    </p>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Unit Terisi
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      xx Unit
                    </p>
                  </div>
                </div>
                <div className="flex pt-[22px] pr-[25px] pb-[29px] pl-[25px] flex-col items-start gap-3 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#7A9CB8] font-plusJakartaSans text-[17px] font-medium w-full tracking-[0.04em]">
                      Total Unit TERSEDIA
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-sora text-[28px] font-semibold w-full">
                      xx Unit
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex py-1 px-0 flex-col items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-plusJakartaSans text-[22px] font-semibold w-full">
                      Pembayaran Terbaru
                    </p>
                  </div>
                </div>
                <div className="flex pt-7 pr-[31px] pb-7 pl-[31px] flex-col items-start rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full h-60">
                  <div className="flex items-start shrink-0 rounded-xl bg-[#F9FAFB] w-full h-[72px] overflow-hidden">
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
                    <div className="flex flex-col items-start rounded-[20px] w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Opsi
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#285A48] font-roboto text-xl w-fit">
                            Detail
                          </p>
                        </div>
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-full h-[270px]">
                <div className="flex py-1 px-0 flex-col items-start w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#1E3549] font-plusJakartaSans text-[22px] font-semibold w-full">
                      Kontrak Terbaru
                    </p>
                  </div>
                </div>
                <div className="flex pt-7 pr-[31px] pb-7 pl-[31px] flex-col items-start shrink-0 rounded-[18.5px] border-[1.54px] border-[rgba(0,0,0,0.07)] bg-[#FFF] shadow-[04px4px0rgba(0,0,0,0.25)] w-full h-60">
                  <div className="flex justify-center items-center rounded-xl bg-[#F9FAFB] w-full overflow-hidden">
                    <div className="flex flex-col items-start w-[200px] h-[200px]">
                      <div className="flex py-2 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          ID{" "}
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          C-001
                        </p>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          C-002
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full h-[200px]">
                      <div className="flex py-2 px-5 items-center gap-3 shrink-0 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
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
                    <div className="flex flex-col items-start w-40 h-full">
                      <div className="flex py-2 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Lantai
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          2
                        </p>
                      </div>
                      <div className="flex py-0 px-5 items-center gap-3 border-b border-b-[#D9EBFE] bg-[#F3F8FF] w-full h-10">
                        <p className="text-[#285A48] font-roboto text-xl w-fit">
                          1
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start rounded-[20px] w-[200px] h-full">
                      <div className="flex py-2 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#285A48] w-full h-8">
                        <p className="text-[#F3F8FF] font-roboto text-xl font-medium w-fit">
                          Opsi
                        </p>
                        <div className="flex flex-col justify-center items-center gap-0.5 w-fit h-4"></div>
                      </div>
                      <div className="flex py-0 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#285A48] font-roboto text-xl w-fit">
                            Detail
                          </p>
                        </div>
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit"></div>
                      </div>
                      <div className="flex py-0 px-5 justify-between items-center border-b border-b-[#D9EBFE] bg-[#F9FAFB] w-full h-10">
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit">
                          <p className="text-[#285A48] font-roboto text-xl w-fit">
                            Detail
                          </p>
                        </div>
                        <div className="flex py-1 px-2 items-center gap-1 rounded-xl w-fit"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </AdminLayout>
  );
}
