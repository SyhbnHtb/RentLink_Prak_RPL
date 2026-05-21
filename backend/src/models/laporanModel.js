// backend\backend\src\models\laporanModel.js
const pool = require('../config/db');

// Ambil laporan keuangan dari pembayaran lunas
const getLaporanKeuangan = async (bulan, tahun) => {
    let query = `
        SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status AS status_tagihan,
            k.id_kontrak,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            un.id_unit,
            un.nama_unit,
            un.tipe
        FROM tagihan t
        LEFT JOIN pembayaran p ON t.id_tagihan = p.tagihan_id
        JOIN kontrak k ON t.kontrak_id = k.id_kontrak
        JOIN users u ON k.user_id = u.id_user
        JOIN unit un ON k.unit_id = un.id_unit
    `;

    const values = [];

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` WHERE LOWER(t.periode) = LOWER($${values.length})`;
    }

    query += ` ORDER BY COALESCE(p.tanggal, t.created_at) DESC, t.id_tagihan DESC`;

    const result = await pool.query(query, values);
    return result.rows;
};

// Ambil ringkasan laporan keuangan
const getRingkasanLaporanKeuangan = async (bulan, tahun) => {
    let query = `
        SELECT 
            COUNT(CASE WHEN t.status = 'lunas' THEN 1 END) AS jumlah_transaksi,
            COALESCE(SUM(CASE WHEN t.status = 'lunas' THEN t.biaya_sewa END), 0) AS total_biaya_sewa,
            COALESCE(SUM(CASE WHEN t.status = 'lunas' THEN t.biaya_listrik END), 0) AS total_biaya_listrik,
            COALESCE(SUM(CASE WHEN t.status = 'lunas' THEN t.biaya_air END), 0) AS total_biaya_air,
            COALESCE(SUM(CASE WHEN t.status = 'lunas' THEN t.total END), 0) AS total_pemasukan,
            COALESCE(SUM(CASE WHEN t.status != 'lunas' THEN t.total END), 0) AS total_belum_lunas,
            COUNT(t.id_tagihan) AS jumlah_unit_tertagih
        FROM tagihan t
    `;

    const values = [];

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` AND LOWER(t.periode) = LOWER($${values.length})`;
    }

    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    getLaporanKeuangan,
    getRingkasanLaporanKeuangan
};