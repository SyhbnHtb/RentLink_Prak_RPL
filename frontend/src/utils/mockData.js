export const MOCK_UNITS = [
  { id: "U-001", nama: "Kamar 101", lantai: "1", harga: 200000, status: "Tersedia", createdAt: "2022-04-01" },
  { id: "U-002", nama: "Kamar 102", lantai: "1", harga: 200000, status: "Tersedia", createdAt: "2022-04-01" },
  { id: "U-003", nama: "Kamar 201", lantai: "2", harga: 200000, status: "Terisi", createdAt: "2023-09-11" },
  { id: "U-004", nama: "Kamar 202", lantai: "2", harga: 200000, status: "Terisi", createdAt: "2023-09-11" },
];

export const MOCK_KONTRAK = [
  { id: "C-001", idUnit: "U-003", namaUnit: "Kamar 201", lantai: "2", penyewa: "Rusdi", tglMulai: "2026-09-11", tglSelesai: "2026-09-18", status: "Aktif", penyewaDetail: { email: "rusdi@gmail.com", asal: "Bandung", ktp: "3273111111", telp: "0812345678" } },
  { id: "C-002", idUnit: "U-002", namaUnit: "Kamar 102", lantai: "1", penyewa: "Nasir", tglMulai: "2026-04-01", tglSelesai: "2026-04-11", status: "Selesai", penyewaDetail: { email: "nasir@gmail.com", asal: "Ngawi", ktp: "910216769", telp: "0123456789" } },
];

export const MOCK_METERAN = [
  { id: "M-001", idUnit: "U-003", namaUnit: "Kamar 201", lantai: "2", penyewa: "Rusdi", listrik: null, air: null, total: null },
  { id: "M-002", idUnit: "U-002", namaUnit: "Kamar 102", lantai: "1", penyewa: "Nasir", listrik: 14, air: 7, total: 55216 },
];

export const MOCK_TAGIHAN = [
  { id: "INV-001", idUnit: "U-003", namaUnit: "Kamar 201", penyewa: "Rusdi", tglDibayar: null, total: 1400000, status: "Belum Bayar", bulan: "September", periode: 7, kamar: 1400000, listrik: 0, air: 0 },
  { id: "INV-002", idUnit: "U-002", namaUnit: "Kamar 102", penyewa: "Nasir", tglDibayar: "2026-04-07", total: 2055216, status: "Approved", bulan: "April", periode: 10, kamar: 2000000, listrik: 20216, air: 35000 },
];

export const MOCK_RIWAYAT = [
  { id: "INV-002", idUnit: "U-002", namaUnit: "Kamar 102", penyewa: "Nasir", tglDibayar: "2026-04-07", total: 2055216, status: "Selesai", tahun: "2026", periode: 10, kamar: 2000000, listrik: 20216, air: 35000 },
];
