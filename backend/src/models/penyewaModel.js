//backend\backend\src\models\penyewaModel.js
const pool = require('../config/db');

// Ambil semua user dengan role penyewa beserta unit aktif
const getAllPenyewa = async () => {
    const result = await pool.query(
        `SELECT u.id_user, u.name, u.email, u.role, u.phone, u.ktp, u.asal,
                k.id_kontrak, un.nama_unit, un.lantai,
                CASE WHEN k.id_kontrak IS NOT NULL THEN 'aktif' ELSE 'tidak_aktif' END AS status_sewa
         FROM users u
         LEFT JOIN kontrak k ON u.id_user = k.user_id AND k.status = 'aktif'
         LEFT JOIN unit un ON k.unit_id = un.id_unit
         WHERE u.role = 'penyewa'
         ORDER BY u.id_user ASC`
    );

    return result.rows;
};

// Ambil penyewa berdasarkan ID
const getPenyewaById = async (id_user) => {
    const result = await pool.query(
        `SELECT id_user, name, email, role, phone
         FROM users
         WHERE id_user = $1 AND role = 'penyewa'`,
        [id_user]
    );

    return result.rows[0];
};

// Cek email duplikat
const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );

    return result.rows[0];
};

// Tambah penyewa baru
const createPenyewa = async (name, email, hashedPassword, phone) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role, phone)
         VALUES ($1, $2, $3, 'penyewa', $4)
         RETURNING id_user, name, email, role, phone`,
        [name, email, hashedPassword, phone]
    );

    return result.rows[0];
};

// Update penyewa
const updatePenyewa = async (id_user, name, email, phone) => {
    const result = await pool.query(
        `UPDATE users
         SET name = $1,
             email = $2,
             phone = $3
         WHERE id_user = $4 AND role = 'penyewa'
         RETURNING id_user, name, email, role, phone`,
        [name, email, phone, id_user]
    );

    return result.rows[0];
};

// Hapus penyewa
const deletePenyewa = async (id_user) => {
    const result = await pool.query(
        `DELETE FROM users
         WHERE id_user = $1 AND role = 'penyewa'
         RETURNING id_user, name, email, role, phone`,
        [id_user]
    );

    return result.rows[0];
};

// Ambil unit yang sedang disewa oleh penyewa login
const getUnitSaya = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            un.id_unit,
            un.nama_unit,
            un.tipe,
            un.lantai,
            un.harga,
            un.status AS status_unit,
            un.created_at,
            k.id_kontrak,
            k.tgl_mulai,
            k.tgl_akhir,
            k.status AS status_kontrak
         FROM kontrak k
         JOIN unit un ON k.unit_id = un.id_unit
         WHERE k.user_id = $1
           AND k.status = 'aktif'
         ORDER BY k.id_kontrak DESC
         LIMIT 1`,
        [user_id]
    );

    return result.rows[0];
};

// Ambil kontrak milik penyewa login
const getKontrakSaya = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            k.id_kontrak,
            k.user_id,
            k.unit_id,
            k.tgl_mulai,
            k.tgl_akhir,
            k.status AS status_kontrak,
            un.nama_unit,
            un.tipe,
            un.lantai,
            un.harga,
            un.status AS status_unit,
            u.name AS nama_penyewa,
            u.email AS email_penyewa,
            u.phone,
            u.ktp,
            u.asal
         FROM kontrak k
         JOIN unit un ON k.unit_id = un.id_unit
         JOIN users u ON k.user_id = u.id_user
         WHERE k.user_id = $1
         ORDER BY k.id_kontrak DESC`,
        [user_id]
    );

    return result.rows;
};

module.exports = {
    getAllPenyewa,
    getPenyewaById,
    getUserByEmail,
    createPenyewa,
    updatePenyewa,
    deletePenyewa,
    getUnitSaya,
    getKontrakSaya
};