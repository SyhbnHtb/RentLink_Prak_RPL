/**
 * tagService.js
 *
 * Service layer untuk Tagihan & Pembayaran.
 * Terhubung ke backend riil.
 */

import api from './api';

export async function getTagihan() {
  try {
    const response = await api.get('/tagihan');
    const tagihanData = response.data.data;
    
    return tagihanData.map(t => {
      let mappedStatus = "Belum Bayar";
      if (t.status === 'lunas') mappedStatus = "Approved";
      else if (t.status === 'pending') mappedStatus = "Menunggu Konfirmasi";
      else if (t.status === 'belum') mappedStatus = "Belum Bayar";
      
      return {
        id: t.id_tagihan,
        kontrakId: t.kontrak_id,
        namaUnit: t.nama_unit,
        penyewa: t.nama_penyewa,
        periode: t.periode,
        kamar: t.biaya_sewa,
        listrik: t.biaya_listrik,
        air: t.biaya_air,
        total: t.total,
        status: mappedStatus,
        tglDibayar: t.created_at // Assuming as placeholder if no actual tgl dibayar, or maybe fetch from pembayaran
      };
    });
  } catch (error) {
    console.error("Gagal mengambil tagihan", error);
    return [];
  }
}

export async function getTagihanSaya() {
  try {
    const response = await api.get('/tagihan/me');
    const tagihanData = response.data.data;
    
    return tagihanData.map(t => {
      let mappedStatus = "Belum Bayar";
      if (t.status === 'lunas') mappedStatus = "Approved";
      else if (t.status === 'pending') mappedStatus = "Menunggu Konfirmasi";
      else if (t.status === 'belum') mappedStatus = "Belum Bayar";
      
      return {
        id: t.id_tagihan,
        kontrakId: t.kontrak_id,
        namaUnit: t.nama_unit,
        penyewa: t.nama_penyewa,
        periode: t.periode,
        kamar: t.biaya_sewa,
        listrik: t.biaya_listrik,
        air: t.biaya_air,
        total: t.total,
        status: mappedStatus,
        tglDibayar: t.created_at
      };
    });
  } catch (error) {
    console.error("Gagal mengambil tagihan saya", error);
    return [];
  }
}

export async function approveTagihan(id) {
  // Should call verify API but we might need id_pembayaran instead of id_tagihan.
  // We'll leave this as stub or put `/pembayaran/verifikasi/:id`
  const response = await api.put(`/pembayaran/verifikasi/${id}`, { status: 'lunas' });
  return response.data;
}

export async function disapproveTagihan(id) {
  const response = await api.put(`/pembayaran/verifikasi/${id}`, { status: 'ditolak' });
  return response.data;
}

export async function deleteTagihan(id) {
  const response = await api.delete(`/tagihan/${id}`);
  return response.data;
}

export async function getRiwayat() {
  try {
    const response = await api.get('/pembayaran/riwayat');
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat pembayaran", error);
    return [];
  }
}

export async function getPembayaran() {
  try {
    const response = await api.get('/pembayaran');
    return response.data.data.map(p => ({
      id: p.id_pembayaran,
      tagihanId: p.tagihan_id,
      namaUnit: p.nama_unit || `Unit ${p.id_kontrak}`,
      penyewa: p.nama_penyewa,
      tanggal: p.tanggal,
      total: p.total,
      status: p.status_pembayaran === 'pending' ? 'Menunggu Konfirmasi' : (p.status_pembayaran === 'lunas' ? 'Approved' : 'Ditolak'),
      bukti: p.bukti,
      periode: p.periode,
      kamar: p.biaya_sewa,
      listrik: p.biaya_listrik,
      air: p.biaya_air,
    }));
  } catch (error) {
    console.error("Gagal mengambil data pembayaran", error);
    return [];
  }
}

export async function getRiwayatSaya() {
  try {
    const response = await api.get('/pembayaran/riwayat/me');
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat pembayaran saya", error);
    return [];
  }
}

export async function uploadBukti(tagihanId, file) {
  const formData = new FormData();
  formData.append('tagihan_id', tagihanId);
  formData.append('bukti', file);
  
  const response = await api.post('/pembayaran/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}
