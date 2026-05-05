const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Koneksi Database (Gunakan pool agar bisa melakukan query ke database)
const pool = require('./config/db');

// Import Routes & Middlewares
const authRoutes = require('./routes/authRoutes');
const { verifyToken, isAdmin } = require('./middlewares/authmiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARE WAJIB DI ATAS!
// ==========================================
app.use(cors());
app.use(express.json()); // INI YANG MEMBUAT REQ.BODY BISA DIBACA

// ==========================================
// 2. DAFTAR ROUTES (API ENDPOINTS)
// ==========================================

// Route untuk autentikasi (Register & Login)
app.use('/api/auth', authRoutes);

// --- ENDPOINT UJI COBA MIDDLEWARE & ROLE (KAN-39) ---

// 1. Rute ini bisa diakses siapa saja yang sudah login (Admin & Penyewa)
app.get('/api/dashboard/penyewa', verifyToken, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di Dashboard Penyewa!',
        user_info: req.user // Menampilkan data siapa yang sedang akses
    });
});

// 2. Rute ini HANYA bisa diakses oleh Admin
app.get('/api/dashboard/admin', verifyToken, isAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang Tuan Admin! Ini adalah data rahasia apartemen.',
        user_info: req.user
    });
});

// --- ENDPOINT RIWAYAT PEMBAYARAN (KAN-43 / MODUL 09) ---

// Rute ini menarik data dari tabel pembayaran yang baru saja kita buat
app.get('/api/riwayat', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pembayaran');
        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil riwayat transaksi!',
            data: result.rows
        });
    } catch (error) {
        console.error('Error saat mengambil riwayat:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat dari database',
            error: error.message
        });
    }
});

// Endpoint Dasar
app.get('/', (req, res) => res.json({ message: 'API RentLink berjalan!' }));

// ==========================================
// 3. JALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});