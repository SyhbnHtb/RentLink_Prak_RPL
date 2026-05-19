/**
 * unitService.js
 *
 * Service layer untuk Manajemen Unit.
 * Terhubung ke backend riil melalui Axios interceptor.
 */

import api from './api';

const formatTanggal = (isoString) => {
  if (!isoString) return "-";
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(isoString));
};

export async function getUnits() {
  try {
    const response = await api.get('/unit');
    const units = response.data.data;
    
    return units.map(u => ({
      id: u.id_unit,
      nama: u.nama_unit,
      tipe: u.tipe,
      lantai: u.lantai ? u.lantai.toString() : "-",
      harga: Number(u.harga),
      status: u.status === 'tersedia' ? 'Tersedia' : 'Terisi',
      createdAt: formatTanggal(u.created_at)
    }));
  } catch (error) {
    console.error("Gagal mengambil data unit", error);
    return [];
  }
}

export async function createUnit(data) {
  const payload = {
    nama_unit: data.nama,
    tipe: "Kamar",
    harga: data.harga || 200000,
    status: data.status ? data.status.toLowerCase() : 'tersedia',
    lantai: parseInt(data.lantai) || null
  };
  
  const response = await api.post('/unit', payload);
  const u = response.data.data;
  
  return {
    id: u.id_unit,
    nama: u.nama_unit,
    tipe: u.tipe,
    lantai: u.lantai ? u.lantai.toString() : "-",
    harga: Number(u.harga),
    status: u.status === 'tersedia' ? 'Tersedia' : 'Terisi',
    createdAt: formatTanggal(u.created_at)
  };
}

export async function updateUnit(id, data) {
  const payload = {
    nama_unit: data.nama,
    tipe: "Kamar",
    harga: data.harga || 200000,
    status: data.status ? data.status.toLowerCase() : 'tersedia',
    lantai: parseInt(data.lantai) || null
  };
  
  const response = await api.put(`/unit/${id}`, payload);
  return response.data.data;
}

export async function deleteUnit(id) {
  const response = await api.delete(`/unit/${id}`);
  return response.data;
}
