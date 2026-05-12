// backend\backend\src\server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Koneksi Database
require('./config/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const unitRoutes = require('./routes/unitRoutes');
const penyewaRoutes = require('./routes/penyewaRoutes');
const kontrakRoutes = require('./routes/kontrakRoutes');
const meteranRoutes = require('./routes/meteranRoutes');
const tagihanRoutes = require('./routes/tagihanRoutes');
const pembayaranRoutes = require('./routes/pembayaranRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const notFound = require('./middlewares/notFound');
const profileRoutes = require('./routes/profileRoutes');

// Import Middlewares
const { verifyToken, isAdmin } = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE GLOBAL
// ==========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Agar file bukti pembayaran di folder uploads bisa diakses
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// ==========================================
// 2. ROUTES UTAMA API RENTLINK
// ==========================================
app.use('/api/auth', authRoutes);
app.use('/api/unit', unitRoutes);
app.use('/api/penyewa', penyewaRoutes);
app.use('/api/kontrak', kontrakRoutes);
app.use('/api/meteran', meteranRoutes);
app.use('/api/tagihan', tagihanRoutes);
app.use('/api/pembayaran', pembayaranRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/laporan', laporanRoutes);
app.use('/api/profile', profileRoutes);

// ==========================================
// 3. ENDPOINT DASHBOARD SEDERHANA / TEST ROLE
// ==========================================

// Dashboard penyewa sederhana
app.get('/api/dashboard/penyewa', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di Dashboard Penyewa!',
        user_info: req.user
    });
});

// Dashboard admin sederhana
app.get('/api/dashboard/admin', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang Tuan Admin! Ini adalah data rahasia apartemen.',
        user_info: req.user
    });
});

// ==========================================
// 4. ENDPOINT DASAR
// ==========================================
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API RentLink berjalan!'
    });
});

// Endpoint untuk mengecek apakah server aktif
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server RentLink aktif',
        timestamp: new Date().toISOString()
    });
});

// ==========================================
// 5. HANDLE ROUTE TIDAK DITEMUKAN
// ==========================================
app.use(notFound);

// ==========================================
// 6. ERROR HANDLER TERPUSAT
// ==========================================
app.use(errorHandler);

// ==========================================
// 7. JALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});