const express = require('express');
const router = express.Router();

const tagihanController = require('../controllers/tagihanController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

const {
    tagihanIdParamValidator,
    generateTagihanValidator
} = require('../validators/tagihanValidator');

// Admin: lihat semua tagihan
router.get('/', verifyToken, isAdmin, tagihanController.getAllTagihan);

// Penyewa: lihat tagihan miliknya sendiri
router.get('/me', verifyToken, tagihanController.getMyTagihan);

// Admin: generate tagihan otomatis
router.post(
    '/generate',
    verifyToken,
    isAdmin,
    generateTagihanValidator,
    handleValidationErrors,
    tagihanController.generateTagihan
);

// Admin dan penyewa: lihat detail tagihan
router.get(
    '/:id',
    verifyToken,
    tagihanIdParamValidator,
    handleValidationErrors,
    tagihanController.getTagihanById
);

// Admin: hapus tagihan
router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    tagihanIdParamValidator,
    handleValidationErrors,
    tagihanController.deleteTagihan
);

module.exports = router;