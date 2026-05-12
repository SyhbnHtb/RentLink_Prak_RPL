// backend\backend\src\routes\dashboardRoutes.js
const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Admin: statistik dashboard
router.get(
    '/admin/stats',
    verifyToken,
    isAdmin,
    dashboardController.getAdminDashboardStats
);

// Penyewa: statistik dashboard
router.get(
    '/penyewa/stats',
    verifyToken,
    dashboardController.getPenyewaDashboardStats
);

module.exports = router;