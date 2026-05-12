// backend\backend\src\models\pembayaranModel.js
const pool = require('../config/db');

// Ambil detail tagihan beserta pemiliknya
const getTagihanWithOwnerById = async (id_tagihan) => {
    const result = await pool.query(
        `SELECT 
            t.id_tagihan,
            t.kontrak_id,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit
         FROM tagihan t
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE t.id_tagihan = $1`,
        [id_tagihan]
    );

    return result.rows[0];
};

// Cek apakah sudah ada pembayaran pending/lunas untuk tagihan tersebut
const getActivePembayaranByTagihanId = async (tagihan_id) => {
    const result = await pool.query(
        `SELECT *
         FROM pembayaran
         WHERE tagihan_id = $1
           AND status IN ('pending', 'lunas')
         ORDER BY id_pembayaran DESC
         LIMIT 1`,
        [tagihan_id]
    );

    return result.rows[0];
};

// Upload bukti pembayaran dan update status tagihan menjadi pending
const createPembayaran = async (tagihan_id, tanggal, bukti, status = 'pending') => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const pembayaranResult = await client.query(
            `INSERT INTO pembayaran (tagihan_id, tanggal, bukti, status)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [tagihan_id, tanggal, bukti, status]
        );

        await client.query(
            `UPDATE tagihan
             SET status = 'pending'
             WHERE id_tagihan = $1`,
            [tagihan_id]
        );

        await client.query('COMMIT');

        return pembayaranResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Ambil semua pembayaran dengan detail tagihan, penyewa, dan unit
const getAllPembayaran = async () => {
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
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            un.nama_unit
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         ORDER BY p.id_pembayaran DESC`
    );

    return result.rows;
};

// Ambil pembayaran berdasarkan ID dengan detail tagihan
const getPembayaranById = async (id_pembayaran) => {
    const result = await pool.query(
        `SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            t.id_tagihan,
            t.periode,
            t.total,
            t.status AS status_tagihan,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            un.nama_unit
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE p.id_pembayaran = $1`,
        [id_pembayaran]
    );

    return result.rows[0];
};

// Verifikasi pembayaran oleh admin
const verifyPembayaran = async (id_pembayaran, status) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const pembayaranResult = await client.query(
            `UPDATE pembayaran
             SET status = $1
             WHERE id_pembayaran = $2
             RETURNING *`,
            [status, id_pembayaran]
        );

        const updatedPembayaran = pembayaranResult.rows[0];

        if (!updatedPembayaran) {
            await client.query('ROLLBACK');
            return null;
        }

        let newStatusTagihan = 'pending';

        if (status === 'lunas') {
            newStatusTagihan = 'lunas';
        } else if (status === 'ditolak') {
            newStatusTagihan = 'belum';
        }

        await client.query(
            `UPDATE tagihan
             SET status = $1
             WHERE id_tagihan = $2`,
            [newStatusTagihan, updatedPembayaran.tagihan_id]
        );

        await client.query('COMMIT');

        return updatedPembayaran;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Ambil riwayat pembayaran semua penyewa untuk admin dengan filter
const getRiwayatPembayaranAdmin = async ({ search, status, bulan, tahun, sort }) => {
    let query = `
        SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            p.created_at,
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
            un.tipe,
            un.lantai
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE 1=1
    `;

    const values = [];

    if (search) {
        values.push(`%${search}%`);
        query += `
            AND (
                LOWER(u.name) LIKE LOWER($${values.length})
                OR LOWER(u.email) LIKE LOWER($${values.length})
                OR LOWER(un.nama_unit) LIKE LOWER($${values.length})
                OR LOWER(t.periode) LIKE LOWER($${values.length})
            )
        `;
    }

    if (status) {
        values.push(status);
        query += ` AND p.status = $${values.length}`;
    }

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` AND LOWER(t.periode) = LOWER($${values.length})`;
    }

    if (sort === 'terlama') {
        query += ` ORDER BY p.id_pembayaran ASC`;
    } else if (sort === 'total_terbesar') {
        query += ` ORDER BY t.total DESC`;
    } else if (sort === 'total_terkecil') {
        query += ` ORDER BY t.total ASC`;
    } else {
        query += ` ORDER BY p.id_pembayaran DESC`;
    }

    const result = await pool.query(query, values);

    return result.rows;
};

// Ambil riwayat pembayaran milik penyewa yang sedang login dengan filter
const getRiwayatPembayaranByUserId = async (user_id, { status, bulan, tahun, sort }) => {
    let query = `
        SELECT 
            p.id_pembayaran,
            p.tagihan_id,
            p.tanggal,
            p.bukti,
            p.status AS status_pembayaran,
            p.created_at,
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
            un.tipe,
            un.lantai
         FROM pembayaran p
         JOIN tagihan t ON p.tagihan_id = t.id_tagihan
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.user_id = $1
    `;

    const values = [user_id];

    if (status) {
        values.push(status);
        query += ` AND p.status = $${values.length}`;
    }

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` AND LOWER(t.periode) = LOWER($${values.length})`;
    }

    if (sort === 'terlama') {
        query += ` ORDER BY p.id_pembayaran ASC`;
    } else if (sort === 'total_terbesar') {
        query += ` ORDER BY t.total DESC`;
    } else if (sort === 'total_terkecil') {
        query += ` ORDER BY t.total ASC`;
    } else {
        query += ` ORDER BY p.id_pembayaran DESC`;
    }

    const result = await pool.query(query, values);

    return result.rows;
};

module.exports = {
    getTagihanWithOwnerById,
    getActivePembayaranByTagihanId,
    createPembayaran,
    getAllPembayaran,
    getPembayaranById,
    verifyPembayaran,
    getRiwayatPembayaranAdmin,
    getRiwayatPembayaranByUserId,
};