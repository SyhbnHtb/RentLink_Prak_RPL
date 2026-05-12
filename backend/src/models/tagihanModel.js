// backend\backend\src\models\tagihanModel.js
const pool = require('../config/db');

// Ambil semua kontrak aktif dengan detail unit dan penyewa
const getAllActiveKontrak = async () => {
    const result = await pool.query(
        `SELECT 
            k.id_kontrak,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit,
            un.tipe,
            un.harga,
            k.tgl_mulai,
            k.tgl_akhir,
            k.status
         FROM kontrak k
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.status = 'aktif'
         ORDER BY k.id_kontrak ASC`
    );

    return result.rows;
};

// Ambil kontrak aktif berdasarkan ID
const getActiveKontrakById = async (id_kontrak) => {
    const result = await pool.query(
        `SELECT 
            k.id_kontrak,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit,
            un.tipe,
            un.harga,
            k.tgl_mulai,
            k.tgl_akhir,
            k.status
         FROM kontrak k
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.id_kontrak = $1
           AND k.status = 'aktif'`,
        [id_kontrak]
    );

    return result.rows[0];
};

// Ambil data meteran berdasarkan unit, bulan, dan tahun
const getMeteranByUnitPeriode = async (unit_id, bulan, tahun) => {
    const result = await pool.query(
        `SELECT *
         FROM meteran
         WHERE unit_id = $1
           AND LOWER(bulan) = LOWER($2)
           AND tahun = $3`,
        [unit_id, bulan, tahun]
    );

    return result.rows[0];
};

// Cek apakah tagihan untuk kontrak dan periode sudah pernah dibuat
const getTagihanByKontrakPeriode = async (kontrak_id, periode) => {
    const result = await pool.query(
        `SELECT *
         FROM tagihan
         WHERE kontrak_id = $1
           AND LOWER(periode) = LOWER($2)`,
        [kontrak_id, periode]
    );

    return result.rows[0];
};

// Membuat tagihan baru
const createTagihan = async (
    kontrak_id,
    periode,
    biaya_sewa,
    biaya_listrik,
    biaya_air,
    total,
    status = 'belum'
) => {
    const result = await pool.query(
        `INSERT INTO tagihan (
            kontrak_id,
            periode,
            biaya_sewa,
            biaya_listrik,
            biaya_air,
            total,
            status
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
            kontrak_id,
            periode,
            biaya_sewa,
            biaya_listrik,
            biaya_air,
            total,
            status
        ]
    );

    return result.rows[0];
};

// Ambil semua tagihan dengan filter search, status, bulan, tahun, dan sort
const getAllTagihan = async ({ search, status, bulan, tahun, sort }) => {
    let query = `
        SELECT 
            t.id_tagihan,
            t.kontrak_id,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit,
            un.tipe,
            un.lantai,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status,
            t.created_at
         FROM tagihan t
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
        query += ` AND t.status = $${values.length}`;
    }

    if (bulan && tahun) {
        values.push(`${bulan} ${tahun}`);
        query += ` AND LOWER(t.periode) = LOWER($${values.length})`;
    }

    if (sort === 'terlama') {
        query += ` ORDER BY t.id_tagihan ASC`;
    } else if (sort === 'total_terbesar') {
        query += ` ORDER BY t.total DESC`;
    } else if (sort === 'total_terkecil') {
        query += ` ORDER BY t.total ASC`;
    } else {
        query += ` ORDER BY t.id_tagihan DESC`;
    }

    const result = await pool.query(query, values);

    return result.rows;
};

// Ambil detail tagihan berdasarkan ID
const getTagihanById = async (id_tagihan) => {
    const result = await pool.query(
        `SELECT 
            t.id_tagihan,
            t.kontrak_id,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit,
            un.tipe,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status
         FROM tagihan t
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE t.id_tagihan = $1`,
        [id_tagihan]
    );

    return result.rows[0];
};

// Ambil tagihan milik penyewa yang sedang login
const getTagihanByUserId = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            t.id_tagihan,
            t.kontrak_id,
            k.user_id,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            k.unit_id,
            un.nama_unit,
            un.tipe,
            t.periode,
            t.biaya_sewa,
            t.biaya_listrik,
            t.biaya_air,
            t.total,
            t.status
         FROM tagihan t
         JOIN kontrak k ON t.kontrak_id = k.id_kontrak
         JOIN users u ON k.user_id = u.id_user
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.user_id = $1
         ORDER BY t.id_tagihan DESC`,
        [user_id]
    );

    return result.rows;
};

// Hapus tagihan jika belum lunas
const deleteTagihan = async (id_tagihan) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const tagihanResult = await client.query(
            `SELECT *
             FROM tagihan
             WHERE id_tagihan = $1`,
            [id_tagihan]
        );

        const tagihan = tagihanResult.rows[0];

        if (!tagihan) {
            await client.query('ROLLBACK');
            return {
                status: 'not_found',
                data: null
            };
        }

        if (tagihan.status === 'lunas') {
            await client.query('ROLLBACK');
            return {
                status: 'lunas',
                data: tagihan
            };
        }

        // Hapus pembayaran terkait jika masih pending/ditolak
        await client.query(
            `DELETE FROM pembayaran
             WHERE tagihan_id = $1
               AND status IN ('pending', 'ditolak')`,
            [id_tagihan]
        );

        const deletedResult = await client.query(
            `DELETE FROM tagihan
             WHERE id_tagihan = $1
             RETURNING *`,
            [id_tagihan]
        );

        await client.query('COMMIT');

        return {
            status: 'deleted',
            data: deletedResult.rows[0]
        };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllActiveKontrak,
    getActiveKontrakById,
    getMeteranByUnitPeriode,
    getTagihanByKontrakPeriode,
    createTagihan,
    getAllTagihan,
    getTagihanById,
    getTagihanByUserId,
    deleteTagihan
};