/**
 * unitService.js
 *
 * Service layer untuk Manajemen Unit.
 * Semua fungsi mengembalikan mock data — tinggal ganti dengan API call.
 */

// TODO: import axios
// import axios from 'axios';
// const API = axios.create({ baseURL: '/api' });

const MOCK_UNITS = [
  { id: 1, nama: "Kamar 201", lantai: 2, harga: 200000, status: "Terisi",    tanggalDibuat: "11 September 2023" },
  { id: 2, nama: "Kamar 102", lantai: 1, harga: 200000, status: "Tersedia",  tanggalDibuat: "1 April 2022" },
];

export async function getUnits() {
  // TODO: return (await API.get('/units')).data;
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_UNITS];
}

export async function createUnit(data) {
  // TODO: return (await API.post('/units', data)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { ...data, id: Date.now() };
}

export async function updateUnit(id, data) {
  // TODO: return (await API.put(`/units/${id}`, data)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { id, ...data };
}

export async function deleteUnit(id) {
  // TODO: return (await API.delete(`/units/${id}`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}
