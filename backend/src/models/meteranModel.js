// backend\backend\src\models\meteranModel.js
const pool = require('../config/db');

// Ambil semua data meteran dengan detail unit dan penyewa
const getAllMeteran = async () => {
    const result = await pool.query(
        `SELECT 
            m.id_meteran,
            u.id_unit AS unit_id,
            u.nama_unit,
            u.tipe,
            u.lantai,
            u.harga,
            m.bulan,
            m.tahun,
            m.meter_listrik_awal,
            m.meter_listrik_akhir,
            m.meter_air_awal,
            m.meter_air_akhir,
            us.name AS nama_penyewa
         FROM unit u
         LEFT JOIN meteran m ON u.id_unit = m.unit_id
         LEFT JOIN kontrak k ON u.id_unit = k.unit_id AND k.status = 'aktif'
         LEFT JOIN users us ON k.user_id = us.id_user
         ORDER BY m.tahun DESC NULLS LAST, m.id_meteran DESC NULLS LAST, u.id_unit ASC`
    );

    return result.rows;
};

// Ambil data meteran berdasarkan ID
const getMeteranById = async (id_meteran) => {
    const result = await pool.query(
        `SELECT 
            m.id_meteran,
            m.unit_id,
            u.nama_unit,
            u.tipe,
            m.bulan,
            m.tahun,
            m.meter_listrik_awal,
            m.meter_listrik_akhir,
            m.meter_air_awal,
            m.meter_air_akhir
         FROM meteran m
         JOIN unit u ON m.unit_id = u.id_unit
         WHERE m.id_meteran = $1`,
        [id_meteran]
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

// Cek apakah meteran untuk unit, bulan, dan tahun yang sama sudah ada
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

// Tambah data meteran baru
const createMeteran = async (
    unit_id,
    bulan,
    tahun,
    meter_listrik_awal,
    meter_listrik_akhir,
    meter_air_awal,
    meter_air_akhir
) => {
    const result = await pool.query(
        `INSERT INTO meteran (
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
        ]
    );

    return result.rows[0];
};

// Update data meteran
const updateMeteran = async (
    id_meteran,
    unit_id,
    bulan,
    tahun,
    meter_listrik_awal,
    meter_listrik_akhir,
    meter_air_awal,
    meter_air_akhir
) => {
    const result = await pool.query(
        `UPDATE meteran
         SET unit_id = $1,
             bulan = $2,
             tahun = $3,
             meter_listrik_awal = $4,
             meter_listrik_akhir = $5,
             meter_air_awal = $6,
             meter_air_akhir = $7
         WHERE id_meteran = $8
         RETURNING *`,
        [
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir,
            id_meteran
        ]
    );

    return result.rows[0];
};

// Hapus data meteran
const deleteMeteran = async (id_meteran) => {
    const result = await pool.query(
        `DELETE FROM meteran
         WHERE id_meteran = $1
         RETURNING *`,
        [id_meteran]
    );

    return result.rows[0];
};

// Ambil data meteran berdasarkan user (penyewa)
const getMeteranByUserId = async (user_id) => {
    const result = await pool.query(
        `SELECT 
            m.id_meteran,
            m.unit_id,
            u.nama_unit,
            u.tipe,
            m.bulan,
            m.tahun,
            m.meter_listrik_awal,
            m.meter_listrik_akhir,
            m.meter_air_awal,
            m.meter_air_akhir
         FROM meteran m
         JOIN unit u ON m.unit_id = u.id_unit
         JOIN kontrak k ON m.unit_id = k.unit_id
         WHERE k.user_id = $1 AND k.status = 'aktif'
         ORDER BY m.tahun DESC, m.id_meteran DESC`,
        [user_id]
    );

    return result.rows;
};

module.exports = {
    getAllMeteran,
    getMeteranById,
    getUnitById,
    getMeteranByUnitPeriode,
    createMeteran,
    updateMeteran,
    deleteMeteran,
    getMeteranByUserId
};