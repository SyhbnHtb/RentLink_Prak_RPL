const pool = require('../config/db');

// Fungsi untuk mencari user berdasarkan email (mencegah duplikat)
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Fungsi untuk memasukkan data user baru ke database
const createUser = async (name, email, hashedPassword, role = 'penyewa') => {
    const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id_user, name, email, role',
        [name, email, hashedPassword, role]
    );
    return result.rows[0]; // Mengembalikan data user yang baru saja dibuat
};

module.exports = {
    getUserByEmail,
    createUser
};