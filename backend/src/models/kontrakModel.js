//backend\backend\src\models\kontrakModel.js
const pool = require('../config/db');

// Ambil semua kontrak dengan detail penyewa dan unit
const getAllKontrak = async () => {
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
         ORDER BY k.id_kontrak ASC`
    );

    return result.rows;
};

// Ambil kontrak berdasarkan ID
const getKontrakById = async (id_kontrak) => {
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
         WHERE k.id_kontrak = $1`,
        [id_kontrak]
    );

    return result.rows[0];
};

// Cek apakah penyewa ada
const getPenyewaById = async (user_id) => {
    const result = await pool.query(
        `SELECT id_user, name, email, role
         FROM users
         WHERE id_user = $1 AND role = 'penyewa'`,
        [user_id]
    );

    return result.rows[0];
};

// Cek apakah unit ada
const getUnitById = async (unit_id) => {
    const result = await pool.query(
        `SELECT *
         FROM unit
         WHERE id_unit = $1`,
        [unit_id]
    );

    return result.rows[0];
};

// Tambah kontrak baru
const createKontrak = async (user_id, unit_id, tgl_mulai, tgl_akhir, status = 'aktif') => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const kontrakResult = await client.query(
            `INSERT INTO kontrak (user_id, unit_id, tgl_mulai, tgl_akhir, status)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [user_id, unit_id, tgl_mulai, tgl_akhir, status]
        );

        if (status === 'aktif') {
            await client.query(
                `UPDATE unit
                 SET status = 'terisi'
                 WHERE id_unit = $1`,
                [unit_id]
            );
        }

        await client.query('COMMIT');
        return kontrakResult.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Update kontrak
const updateKontrak = async (id_kontrak, user_id, unit_id, tgl_mulai, tgl_akhir, status) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const oldKontrak = await client.query(
            `SELECT * FROM kontrak WHERE id_kontrak = $1`,
            [id_kontrak]
        );

        if (!oldKontrak.rows[0]) {
            await client.query('ROLLBACK');
            return null;
        }

        const oldUnitId = oldKontrak.rows[0].unit_id;

        const result = await client.query(
            `UPDATE kontrak
             SET user_id = $1,
                 unit_id = $2,
                 tgl_mulai = $3,
                 tgl_akhir = $4,
                 status = $5
             WHERE id_kontrak = $6
             RETURNING *`,
            [user_id, unit_id, tgl_mulai, tgl_akhir, status, id_kontrak]
        );

        // Jika unit berubah, unit lama dibuat tersedia
        if (Number(oldUnitId) !== Number(unit_id)) {
            await client.query(
                `UPDATE unit
                 SET status = 'tersedia'
                 WHERE id_unit = $1`,
                [oldUnitId]
            );
        }

        // Unit baru mengikuti status kontrak
        if (status === 'aktif') {
            await client.query(
                `UPDATE unit
                 SET status = 'terisi'
                 WHERE id_unit = $1`,
                [unit_id]
            );
        } else if (status === 'selesai') {
            await client.query(
                `UPDATE unit
                 SET status = 'tersedia'
                 WHERE id_unit = $1`,
                [unit_id]
            );
        }

        await client.query('COMMIT');
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Hapus kontrak
const deleteKontrak = async (id_kontrak) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const kontrakResult = await client.query(
            `DELETE FROM kontrak
             WHERE id_kontrak = $1
             RETURNING *`,
            [id_kontrak]
        );

        const deletedKontrak = kontrakResult.rows[0];

        if (!deletedKontrak) {
            await client.query('ROLLBACK');
            return null;
        }

        await client.query(
            `UPDATE unit
             SET status = 'tersedia'
             WHERE id_unit = $1`,
            [deletedKontrak.unit_id]
        );

        await client.query('COMMIT');
        return deletedKontrak;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// Akhiri kontrak dan ubah unit menjadi tersedia
const akhiriKontrak = async (id_kontrak) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const kontrakResult = await client.query(
            `UPDATE kontrak
             SET status = 'selesai'
             WHERE id_kontrak = $1
             RETURNING *`,
            [id_kontrak]
        );

        const updatedKontrak = kontrakResult.rows[0];

        if (!updatedKontrak) {
            await client.query('ROLLBACK');
            return null;
        }

        await client.query(
            `UPDATE unit
             SET status = 'tersedia'
             WHERE id_unit = $1`,
            [updatedKontrak.unit_id]
        );

        await client.query('COMMIT');

        return updatedKontrak;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllKontrak,
    getKontrakById,
    createKontrak,
    updateKontrak,
    deleteKontrak,
    getPenyewaById,
    getUnitById,
    akhiriKontrak
};