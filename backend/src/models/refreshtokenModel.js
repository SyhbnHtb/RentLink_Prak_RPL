// backend\backend\src\models\refreshTokenModel.js
const pool = require('../config/db');

// Simpan refresh token baru
const createRefreshToken = async (user_id, token, expires_at) => {
    const result = await pool.query(
        `INSERT INTO refresh_tokens (user_id, token, expires_at)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [user_id, token, expires_at]
    );

    return result.rows[0];
};

// Ambil refresh token beserta data user
const getRefreshTokenWithUser = async (token) => {
    const result = await pool.query(
        `SELECT 
            rt.id_refresh_token,
            rt.user_id,
            rt.token,
            rt.expires_at,
            rt.created_at,
            u.id_user,
            u.name,
            u.email,
            u.role
         FROM refresh_tokens rt
         JOIN users u ON rt.user_id = u.id_user
         WHERE rt.token = $1`,
        [token]
    );

    return result.rows[0];
};

// Hapus refresh token tertentu
const deleteRefreshToken = async (token) => {
    const result = await pool.query(
        `DELETE FROM refresh_tokens
         WHERE token = $1
         RETURNING *`,
        [token]
    );

    return result.rows[0];
};

// Hapus semua refresh token milik user
const deleteRefreshTokensByUserId = async (user_id) => {
    const result = await pool.query(
        `DELETE FROM refresh_tokens
         WHERE user_id = $1
         RETURNING *`,
        [user_id]
    );

    return result.rows;
};

// Hapus refresh token yang sudah expired
const deleteExpiredRefreshTokens = async () => {
    const result = await pool.query(
        `DELETE FROM refresh_tokens
         WHERE expires_at < NOW()
         RETURNING *`
    );

    return result.rows;
};

module.exports = {
    createRefreshToken,
    getRefreshTokenWithUser,
    deleteRefreshToken,
    deleteRefreshTokensByUserId,
    deleteExpiredRefreshTokens
};