/**
 * kontrakService.js
 *
 * Service layer untuk Manajemen Kontrak.
 * Terhubung ke backend riil.
 */

import api from './api';

export async function getKontraks() {
  try {
    const response = await api.get('/kontrak');
    const kontraks = response.data.data;
    
    return kontraks.map(k => ({
      id: k.id_kontrak,
      userId: k.user_id,
      unitId: k.unit_id,
      namaUnit: k.nama_unit,
      lantai: k.lantai || "-",
      penyewa: k.nama_penyewa,
      emailPenyewa: k.email_penyewa,
      tglMulai: k.tgl_mulai,
      tglSelesai: k.tgl_akhir,
      status: k.status === 'aktif' ? 'Aktif' : 'Selesai'
    }));
  } catch (error) {
    console.error("Gagal mengambil data kontrak", error);
    return [];
  }
}

export async function createKontrak(data) {
  // data format required by backend: { user_id, unit_id, tgl_mulai, tgl_akhir }
  const response = await api.post('/kontrak', data);
  return response.data.data;
}

export async function updateKontrak(id, data) {
  const response = await api.put(`/kontrak/${id}`, data);
  return response.data.data;
}

export async function deleteKontrak(id) {
  const response = await api.delete(`/kontrak/${id}`);
  return response.data;
}

export async function endKontrak(id) {
  const response = await api.put(`/kontrak/${id}/akhiri`);
  return response.data.data;
}
