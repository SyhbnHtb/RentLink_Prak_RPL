// backend\backend\src\routes\pembayaranRoutes.js
const express = require('express');
const router = express.Router();

const pembayaranController = require('../controllers/pembayaranController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Admin: lihat semua pembayaran
router.get('/', verifyToken, isAdmin, pembayaranController.getAllPembayaran);

// Admin: lihat seluruh riwayat pembayaran
router.get(
    '/riwayat',
    verifyToken,
    isAdmin,
    pembayaranController.getRiwayatPembayaranAdmin
);

// Penyewa: lihat riwayat pembayaran miliknya sendiri
router.get(
    '/riwayat/me',
    verifyToken,
    pembayaranController.getRiwayatPembayaranSaya
);

// Penyewa: upload bukti pembayaran
router.post(
    '/upload',
    verifyToken,
    upload.single('bukti'),
    pembayaranController.uploadBuktiPembayaran
);

// Admin: verifikasi pembayaran
router.put(
    '/verifikasi/:id',
    verifyToken,
    isAdmin,
    pembayaranController.verifyPembayaran
);

// Admin: lihat detail pembayaran
router.get('/:id', verifyToken, isAdmin, pembayaranController.getPembayaranById);

module.exports = router;