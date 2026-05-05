const jwt = require('jsonwebtoken');

// 1. Satpam Pengecek Tiket (Apakah user sudah login?)
const verifyToken = (req, res, next) => {
    // Mengambil token dari header request
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Memecah format "Bearer eyJhb..."

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Akses ditolak! Kamu belum login (Token tidak ditemukan).'
        });
    }

    try {
        // Memverifikasi keaslian token menggunakan kunci rahasia dari .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Menitipkan data user (id_user & role) dari tiket ke dalam req.user
        req.user = decoded;

        // Silakan masuk ke controller (proses selanjutnya)
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token tidak valid atau sudah kedaluwarsa! Silakan login ulang.'
        });
    }
};

// 2. Satpam Pengecek Jabatan (Apakah user adalah Admin?)
const isAdmin = (req, res, next) => {
    // Memastikan middleware verifyToken sudah dijalankan sebelumnya
    if (!req.user) {
        return res.status(500).json({ success: false, message: 'Server error: verifyToken harus dijalankan sebelum isAdmin' });
    }

    // Mengecek apakah role user adalah admin
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak! Fitur ini hanya khusus untuk Admin.'
        });
    }

    // Jika dia admin, silakan masuk
    next();
};

module.exports = {
    verifyToken,
    isAdmin
};