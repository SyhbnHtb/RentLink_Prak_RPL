// backend\backend\src\routes\meteranRoutes.js
const express = require('express');
const router = express.Router();

const meteranController = require('../controllers/meteranController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

const {
    meteranIdParamValidator,
    createMeteranValidator,
    updateMeteranValidator
} = require('../validators/meteranValidator');

// Penyewa: lihat data meteran unit miliknya
router.get('/me', verifyToken, meteranController.getMeteranSaya);

// Semua endpoint manajemen meteran khusus admin
router.get('/', verifyToken, isAdmin, meteranController.getAllMeteran);

router.get(
    '/:id',
    verifyToken,
    isAdmin,
    meteranIdParamValidator,
    handleValidationErrors,
    meteranController.getMeteranById
);

router.post(
    '/',
    verifyToken,
    isAdmin,
    createMeteranValidator,
    handleValidationErrors,
    meteranController.createMeteran
);

router.put(
    '/:id',
    verifyToken,
    isAdmin,
    updateMeteranValidator,
    handleValidationErrors,
    meteranController.updateMeteran
);

router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    meteranIdParamValidator,
    handleValidationErrors,
    meteranController.deleteMeteran
);

module.exports = router;