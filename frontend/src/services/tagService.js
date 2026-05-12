/**
 * tagService.js
 *
 * Service layer untuk Tagihan & Pembayaran.
 */

// TODO: import axios
// const API = axios.create({ baseURL: '/api' });

const MOCK_TAGIHAN = [
  { id: "INV-001", namaUnit: "Kamar 201", penyewa: "Rusdi",  tanggalDibayar: "-",             total: 1400000, status: "Belum Bayar" },
  { id: "INV-002", namaUnit: "Kamar 102", penyewa: "Nasir",  tanggalDibayar: "7 April 2026",  total: 2055216, status: "Approved" },
];

export async function getTagihan() {
  // TODO: return (await API.get('/tagihan')).data;
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_TAGIHAN];
}

export async function approveTagihan(id) {
  // TODO: return (await API.put(`/tagihan/${id}/approve`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}

export async function disapproveTagihan(id) {
  // TODO: return (await API.put(`/tagihan/${id}/disapprove`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}

export async function deleteTagihan(id) {
  // TODO: return (await API.delete(`/tagihan/${id}`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}

export async function getRiwayat() {
  // TODO: return (await API.get('/riwayat')).data;
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_TAGIHAN.filter((t) => t.status === "Approved");
}
