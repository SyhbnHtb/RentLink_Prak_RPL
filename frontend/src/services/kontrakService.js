/**
 * kontrakService.js
 *
 * Service layer untuk Manajemen Kontrak.
 */

// TODO: import axios
// const API = axios.create({ baseURL: '/api' });

const MOCK_KONTRAK = [
  { id: "C-001", namaUnit: "Kamar 201", lantai: 2, penyewa: "Rusdi",  tanggalMulai: "11 September 2026", tanggalSelesai: "18 September 2026", status: "Aktif" },
  { id: "C-002", namaUnit: "Kamar 102", lantai: 1, penyewa: "Nasir",  tanggalMulai: "1 April 2026",      tanggalSelesai: "11 April 2026",     status: "Selesai" },
];

export async function getKontraks() {
  // TODO: return (await API.get('/kontrak')).data;
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_KONTRAK];
}

export async function createKontrak(data) {
  // TODO: return (await API.post('/kontrak', data)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { ...data, id: `C-${Date.now()}` };
}

export async function endKontrak(id) {
  // TODO: return (await API.put(`/kontrak/${id}/end`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}
