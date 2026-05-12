// backend\backend\src\controllers\authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');
const refreshTokenModel = require('../models/refreshTokenModel');

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id_user: user.id_user,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
        }
    );
};

// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id_user: user.id_user,
            role: user.role,
            type: 'refresh'
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
        }
    );
};

// Hitung tanggal expired refresh token
const getRefreshTokenExpiresAt = () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    return expiresAt;
};

// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak lengkap!'
            });
        }

        const existingUser = await userModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar.'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.createUser(name, email, hashedPassword);

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil!',
            data: newUser
        });
    } catch (error) {
        console.error('Error saat register:', error.message);

        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan internal',
            error: error.message
        });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email dan password harus diisi!'
            });
        }

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email tidak ditemukan. Silakan register terlebih dahulu.'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password yang kamu masukkan salah!'
            });
        }

        // Bersihkan refresh token expired
        await refreshTokenModel.deleteExpiredRefreshTokens();

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await refreshTokenModel.createRefreshToken(
            user.id_user,
            refreshToken,
            getRefreshTokenExpiresAt()
        );

        res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            data: {
                id_user: user.id_user,
                name: user.name,
                email: user.email,
                role: user.role,

                // Tetap kirim token agar kompatibel dengan kode lama Anda
                token: accessToken,

                // Nama yang lebih jelas untuk alur baru
                accessToken,
                refreshToken
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

// POST /api/auth/refresh-token
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body || {};

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token wajib diisi'
            });
        }

        const savedToken = await refreshTokenModel.getRefreshTokenWithUser(refreshToken);

        if (!savedToken) {
            return res.status(403).json({
                success: false,
                message: 'Refresh token tidak valid atau sudah logout'
            });
        }

        if (new Date(savedToken.expires_at) < new Date()) {
            await refreshTokenModel.deleteRefreshToken(refreshToken);

            return res.status(403).json({
                success: false,
                message: 'Refresh token sudah kedaluwarsa, silakan login ulang'
            });
        }

        let decoded;

        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (error) {
            await refreshTokenModel.deleteRefreshToken(refreshToken);

            return res.status(403).json({
                success: false,
                message: 'Refresh token tidak valid'
            });
        }

        if (decoded.type !== 'refresh') {
            return res.status(403).json({
                success: false,
                message: 'Token yang dikirim bukan refresh token'
            });
        }

        const user = {
            id_user: savedToken.id_user,
            role: savedToken.role
        };

        const newAccessToken = generateAccessToken(user);

        res.status(200).json({
            success: true,
            message: 'Access token berhasil diperbarui',
            data: {
                token: newAccessToken,
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        console.error('Error refreshToken:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui access token',
            error: error.message
        });
    }
};

// POST /api/auth/logout
const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body || {};

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token wajib diisi untuk logout'
            });
        }

        const deletedToken = await refreshTokenModel.deleteRefreshToken(refreshToken);

        if (!deletedToken) {
            return res.status(404).json({
                success: false,
                message: 'Refresh token tidak ditemukan atau user sudah logout'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Logout berhasil'
        });
    } catch (error) {
        console.error('Error logout:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal logout',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    refreshToken,
    logout
};