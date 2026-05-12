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
        FROM pembayaran p
        JOIN tagihan t ON p.tagihan_id = t.id_tagihan
        JOIN kontrak k ON t.kontrak_id = k.id_kontrak
        JOIN users u ON k.user_id = u.id_user
        JOIN unit un ON k.unit_id = un.id_unit
        WHERE p.status = 'lunas'
    `;

    const values = [];

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` AND LOWER(t.periode) = LOWER($${values.length})`;
    }

    query += ` ORDER BY p.tanggal DESC, p.id_pembayaran DESC`;

    const result = await pool.query(query, values);
    return result.rows;
};

// Ambil ringkasan laporan keuangan
const getRingkasanLaporanKeuangan = async (bulan, tahun) => {
    let query = `
        SELECT 
            COUNT(p.id_pembayaran) AS jumlah_transaksi,
            COALESCE(SUM(t.biaya_sewa), 0) AS total_biaya_sewa,
            COALESCE(SUM(t.biaya_listrik), 0) AS total_biaya_listrik,
            COALESCE(SUM(t.biaya_air), 0) AS total_biaya_air,
            COALESCE(SUM(t.total), 0) AS total_pemasukan
        FROM pembayaran p
        JOIN tagihan t ON p.tagihan_id = t.id_tagihan
        WHERE p.status = 'lunas'
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