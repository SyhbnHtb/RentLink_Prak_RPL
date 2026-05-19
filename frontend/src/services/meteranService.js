import api from './api';

export async function getMeteran() {
  try {
    const response = await api.get('/meteran');
    const data = response.data.data;
    
    return data.map(m => ({
      id: m.id_meteran,
      namaUnit: m.nama_unit,
      penyewa: m.nama_penyewa || "Kosong",
      bulan: m.bulan,
      tahun: m.tahun,
      listrikAwal: m.listrik_awal,
      listrikAkhir: m.listrik_akhir,
      airAwal: m.air_awal,
      airAkhir: m.air_akhir,
      // Calculate usage locally for display
      listrikPakai: m.listrik_akhir - m.listrik_awal,
      airPakai: m.air_akhir - m.air_awal
    }));
  } catch (error) {
    console.error("Gagal mengambil data meteran", error);
    return [];
  }
}

export async function getMeteranSaya() {
  try {
    const response = await api.get('/meteran/me');
    const data = response.data.data;
    
    return data.map(m => ({
      id: m.id_meteran,
      namaUnit: m.nama_unit,
      penyewa: m.nama_penyewa || "Kosong",
      bulan: m.bulan,
      tahun: m.tahun,
      listrikAwal: m.meter_listrik_awal,
      listrikAkhir: m.meter_listrik_akhir,
      airAwal: m.meter_air_awal,
      airAkhir: m.meter_air_akhir,
      listrikPakai: m.meter_listrik_akhir - m.meter_listrik_awal,
      airPakai: m.meter_air_akhir - m.meter_air_awal
    }));
  } catch (error) {
    console.error("Gagal mengambil data meteran saya", error);
    return [];
  }
}

export async function createMeteran(data) {
  const response = await api.post('/meteran', data);
  return response.data;
}

export async function updateMeteran(id, data) {
  const response = await api.put(`/meteran/${id}`, data);
  return response.data;
}

export async function deleteMeteran(id) {
  const response = await api.delete(`/meteran/${id}`);
  return response.data;
}
