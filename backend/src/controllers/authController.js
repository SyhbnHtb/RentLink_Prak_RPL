const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Tambahkan library JWT
const userModel = require('../models/userModel');

// --- FUNGSI REGISTER (Sudah kita buat sebelumnya) ---
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Data tidak lengkap!' });
        }

        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email sudah terdaftar.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await userModel.createUser(name, email, hashedPassword);

        res.status(201).json({ success: true, message: 'Registrasi berhasil!', data: newUser });
    } catch (error) {
        console.error('Error saat register:', error.message);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan internal', error: error.message });
    }
};

// --- FUNGSI LOGIN (BARU) ---
const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        // 1. Validasi Input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password harus diisi!'
            });
        }

        // 2. Cari User berdasarkan email
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email tidak ditemukan. Silakan register terlebih dahulu.'
            });
        }

        // 3. Verifikasi Password menggunakan bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password yang kamu masukkan salah!'
            });
        }

        // 4. Buat Token JWT (Kartu Akses)
        // Kita menitipkan id_user dan role ke dalam token ini
        const token = jwt.sign(
            { id_user: user.id_user, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token berlaku selama 1 hari
        );

        // 5. Berikan Response Sukses beserta Token
        res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            data: {
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                role: user.role,
                token: token
            }
        });

    } catch (error) {
        console.error('Error saat login:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan internal pada server',
            error: error.message
        });
    }
};

// Jangan lupa export fungsi login-nya
module.exports = {
    register,
    login
};