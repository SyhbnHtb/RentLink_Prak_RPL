// backend\backend\src\models\profileModel.js
const pool = require('../config/db');

// Ambil profile user yang sedang login
const getProfileById = async (id_user) => {
    const result = await pool.query(
        `SELECT 
            id_user,
            name,
            email,
            role,
            phone,
            ktp,
            asal
         FROM users
         WHERE id_user = $1`,
        [id_user]
    );

    return result.rows[0];
};

// Ambil user lengkap termasuk password
const getUserWithPasswordById = async (id_user) => {
    const result = await pool.query(
        `SELECT *
         FROM users
         WHERE id_user = $1`,
        [id_user]
    );

    return result.rows[0];
};

// Cek email apakah sudah dipakai user lain
const getUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT *
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0];
};

// Update profile user
const updateProfile = async (id_user, name, email, phone, ktp, asal) => {
    const result = await pool.query(
        `UPDATE users
         SET name = $1,
             email = $2,
             phone = $3,
             ktp = $4,
             asal = $5
         WHERE id_user = $6
         RETURNING id_user, name, email, role, phone, ktp, asal`,
        [name, email, phone, ktp, asal, id_user]
    );

    return result.rows[0];
};

// Update password user
const updatePassword = async (id_user, hashedPassword) => {
    const result = await pool.query(
        `UPDATE users
         SET password = $1
         WHERE id_user = $2
         RETURNING id_user, name, email, role`,
        [hashedPassword, id_user]
    );

    return result.rows[0];
};

module.exports = {
    getProfileById,
    getUserWithPasswordById,
    getUserByEmail,
    updateProfile,
    updatePassword
};