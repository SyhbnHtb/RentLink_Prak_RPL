// backend\backend\src\models\unitModel.js
const pool = require('../config/db');

// Ambil semua unit
const getAllUnits = async () => {
    const result = await pool.query(
        `SELECT 
            id_unit,
            nama_unit,
            tipe,
            lantai,
            harga,
            status,
            created_at
         FROM unit
         ORDER BY id_unit ASC`
    );

    return result.rows;
};

// Ambil unit berdasarkan ID
const getUnitById = async (id_unit) => {
    const result = await pool.query(
        `SELECT 
            id_unit,
            nama_unit,
            tipe,
            lantai,
            harga,
            status,
            created_at
         FROM unit
         WHERE id_unit = $1`,
        [id_unit]
    );

    return result.rows[0];
};

// Tambah unit baru
const createUnit = async (nama_unit, tipe, harga, status = 'tersedia', lantai = null) => {
    const result = await pool.query(
        `INSERT INTO unit (nama_unit, tipe, harga, status, lantai)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [nama_unit, tipe, harga, status, lantai]
    );

    return result.rows[0];
};

// Update unit
const updateUnit = async (id_unit, nama_unit, tipe, harga, status, lantai = null) => {
    const result = await pool.query(
        `UPDATE unit
         SET nama_unit = $1,
             tipe = $2,
             harga = $3,
             status = $4,
             lantai = $5
         WHERE id_unit = $6
         RETURNING *`,
        [nama_unit, tipe, harga, status, lantai, id_unit]
    );

    return result.rows[0];
};

// Hapus unit
const deleteUnit = async (id_unit) => {
    const result = await pool.query(
        'DELETE FROM unit WHERE id_unit = $1 RETURNING *',
        [id_unit]
    );

    return result.rows[0];
};

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
};