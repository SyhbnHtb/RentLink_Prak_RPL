// backend\backend\src\models\dashboardModel.js
const pool = require('../config/db');

// Ambil statistik utama untuk dashboard admin
const getAdminDashboardStats = async () => {
    const result = await pool.query(
        `SELECT
            (SELECT COUNT(*) FROM unit) AS total_unit,
            (SELECT COUNT(*) FROM unit WHERE status = 'tersedia') AS unit_tersedia,
            (SELECT COUNT(*) FROM unit WHERE status = 'terisi') AS unit_terisi,

            (SELECT COUNT(*) FROM users WHERE role = 'penyewa') AS total_penyewa,

            (SELECT COUNT(*) FROM kontrak) AS total_kontrak,
            (SELECT COUNT(*) FROM kontrak WHERE status = 'aktif') AS kontrak_aktif,
            (SELECT COUNT(*) FROM kontrak WHERE status = 'selesai') AS kontrak_selesai,

            (SELECT COUNT(*) FROM tagihan) AS total_tagihan,
            (SELECT COUNT(*) FROM tagihan WHERE status = 'belum') AS tagihan_belum,
            (SELECT COUNT(*) FROM tagihan WHERE status = 'pending') AS tagihan_pending,
            (SELECT COUNT(*) FROM tagihan WHERE status = 'lunas') AS tagihan_lunas,

            (SELECT COUNT(*) FROM pembayaran) AS total_pembayaran,
            (SELECT COUNT(*) FROM pembayaran WHERE status = 'pending') AS pembayaran_pending,
            (SELECT COUNT(*) FROM pembayaran WHERE status = 'ditolak') AS pembayaran_ditolak,
            (SELECT COUNT(*) FROM pembayaran WHERE status = 'lunas') AS pembayaran_lunas,

            COALESCE((
                SELECT SUM(t.total)
                FROM pembayaran p
                JOIN tagihan t ON p.tagihan_id = t.id_tagihan
                WHERE p.status = 'lunas'
            ), 0) AS total_pemasukan`
    );

    return result.rows[0];
};

// Ambil tagihan terbaru untuk dashboard admin
const getRecentTagihan = async () => {
    const result = await pool.query(
        `SELECT 
            t.id_tagihan,
            t.periode,
            t.total,
            t.status,
            u.name AS nama_penyewa,
            un.nama_unit
         FROM tagihan t
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         ORDER BY t.id_tagihan DESC
         LIMIT 5`
    );

    return result.rows;
};

// Ambil pembayaran terbaru untuk dashboard admin
const getRecentPembayaran = async () => {
    const result = await pool.query(
        `SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            t.periode,
            t.total,
            u.name AS nama_penyewa,
            un.nama_unit
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         ORDER BY p.id_pembayaran DESC
         LIMIT 5`
    );

    return result.rows;
};

// Ambil statistik dashboard penyewa
const getPenyewaDashboardStats = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            k.id_kontrak,
            k.status AS status_kontrak,
            k.tgl_mulai,
            k.tgl_akhir,

            un.id_unit,
            un.nama_unit,
            un.tipe,
            un.lantai,
            un.harga,
            un.status AS status_unit,

            t.id_tagihan,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status AS status_tagihan,

            p.id_pembayaran,
            p.tanggal AS tanggal_pembayaran,
            p.bukti,
            p.status AS status_pembayaran
         FROM kontrak k
         JOIN unit un ON k.unit_id = un.id_unit
         LEFT JOIN tagihan t ON k.id_kontrak = t.kontrak_id
         LEFT JOIN pembayaran p ON t.id_tagihan = p.tagihan_id
         WHERE k.user_id = $1
           AND k.status = 'aktif'
         ORDER BY t.id_tagihan DESC, p.id_pembayaran DESC
         LIMIT 1`,
        [user_id]
    );

    return result.rows[0];
};

// Ambil ringkasan pembayaran penyewa
const getPenyewaRingkasanPembayaran = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            t.id_tagihan,
            t.periode,
            t.total,
            t.status AS status_tagihan,
            k.id_kontrak,
            un.id_unit,
            un.nama_unit,
            un.lantai,
            k.tgl_mulai,
            k.tgl_akhir,
            p.id_pembayaran,
            p.tanggal AS tanggal_pembayaran,
            p.status AS status_pembayaran
         FROM tagihan t
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN unit un ON k.unit_id = un.id_unit
         LEFT JOIN pembayaran p ON t.id_tagihan = p.tagihan_id
         WHERE k.user_id = $1
         ORDER BY t.id_tagihan DESC
         LIMIT 5`,
        [user_id]
    );

    return result.rows;
};

// Ambil riwayat pembayaran terbaru penyewa
const getPenyewaRiwayatTerbaru = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            t.periode,
            t.total,
            t.status AS status_tagihan,
            k.id_kontrak,
            un.id_unit,
            un.nama_unit,
            un.lantai
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.user_id = $1
         ORDER BY p.id_pembayaran DESC
         LIMIT 5`,
        [user_id]
    );

    return result.rows;
};

module.exports = {
    getAdminDashboardStats,
    getRecentTagihan,
    getRecentPembayaran,
    getPenyewaDashboardStats,
    getPenyewaRingkasanPembayaran,
    getPenyewaRiwayatTerbaru
};