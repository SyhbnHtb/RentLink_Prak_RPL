/**
 * userService.js
 *
 * Service layer untuk data pengguna (profil, daftar penyewa).
 */

// TODO: import axios
// const API = axios.create({ baseURL: '/api' });

const MOCK_PENYEWA = [
  { id: 2, nama: "Nasir",  username: "nasir",  email: "nasir@rentlink.com",  ktp: "910216769",  telepon: "0123456789", asal: "Ngawi",    unit: "Kamar 102", statusKontrak: "Aktif" },
  { id: 3, nama: "Rusdi",  username: "rusdi",  email: "rusdi@rentlink.com",  ktp: "810315482",  telepon: "0987654321", asal: "Surabaya", unit: "Kamar 201", statusKontrak: "Aktif" },
];

export async function getPenyewa() {
  // TODO: return (await API.get('/users?role=user')).data;
  await new Promise((r) => setTimeout(r, 300));
  return [...MOCK_PENYEWA];
}

export async function getPenyewaById(id) {
  // TODO: return (await API.get(`/users/${id}`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return MOCK_PENYEWA.find((p) => p.id === id) || null;
}

export async function updateProfil(id, data) {
  // TODO: return (await API.put(`/users/${id}`, data)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true, ...data };
}

export async function deletePenyewa(id) {
  // TODO: return (await API.delete(`/users/${id}`)).data;
  await new Promise((r) => setTimeout(r, 300));
  return { success: true };
}
