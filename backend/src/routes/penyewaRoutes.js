// backend\backend\src\routes\penyewaRoutes.js
const express = require('express');
const router = express.Router();

const penyewaController = require('../controllers/penyewaController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

const {
    penyewaIdParamValidator,
    createPenyewaValidator,
    updatePenyewaValidator
} = require('../validators/penyewaValidator');

// Penyewa: lihat unit saya
router.get('/unit-saya', verifyToken, penyewaController.getUnitSaya);

// Penyewa: lihat kontrak saya
router.get('/kontrak-saya', verifyToken, penyewaController.getKontrakSaya);

// Admin: lihat semua penyewa
router.get('/', verifyToken, isAdmin, penyewaController.getAllPenyewa);

// Admin: detail penyewa
router.get(
    '/:id',
    verifyToken,
    isAdmin,
    penyewaIdParamValidator,
    handleValidationErrors,
    penyewaController.getPenyewaById
);

// Admin: tambah penyewa
router.post(
    '/',
    verifyToken,
    isAdmin,
    createPenyewaValidator,
    handleValidationErrors,
    penyewaController.createPenyewa
);

// Admin: update penyewa
router.put(
    '/:id',
    verifyToken,
    isAdmin,
    updatePenyewaValidator,
    handleValidationErrors,
    penyewaController.updatePenyewa
);

// Admin: hapus penyewa
router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    penyewaIdParamValidator,
    handleValidationErrors,
    penyewaController.deletePenyewa
);

module.exports = router;