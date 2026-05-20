/**
 * userService.js
 *
 * Service layer untuk data pengguna (profil, daftar penyewa).
 * Terhubung ke backend riil.
 */

import api from './api';

export async function getPenyewa() {
  try {
    const response = await api.get('/penyewa');
    const users = response.data.data;
    
    return users.map(u => ({
      id_user: u.id_user,
      name: u.name,
      email: u.email,
      telepon: u.phone || "-",
      ktp: u.ktp || "-",
      asal: u.asal || "-",
      unit: u.nama_unit || "-",
      status: u.status_sewa === 'aktif' ? "Aktif" : "Tidak Aktif"
    }));
  } catch (error) {
    console.error("Gagal mengambil data penyewa", error);
    return [];
  }
}

export async function getPenyewaById(id) {
  try {
    const response = await api.get(`/penyewa/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil detail penyewa", error);
    return null;
  }
}

export async function updateProfil(data) {
  // Update profile via /profile
  const response = await api.put('/profile/me', data);
  return response.data;
}

export async function deletePenyewa(id) {
  const response = await api.delete(`/penyewa/${id}`);
  return response.data;
}

export async function getKontrakSaya() {
  try {
    const response = await api.get('/penyewa/kontrak-saya');
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil kontrak saya", error);
    return [];
  }
}

export async function getUnitSaya() {
  try {
    const response = await api.get('/penyewa/unit-saya');
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil unit saya", error);
    return null;
  }
}

