// backend\backend\src\routes\laporanRoutes.js
const express = require('express');
const router = express.Router();

const laporanController = require('../controllers/laporanController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Admin: laporan keuangan
router.get('/keuangan', verifyToken, isAdmin, laporanController.getLaporanKeuangan);

module.exports = router;