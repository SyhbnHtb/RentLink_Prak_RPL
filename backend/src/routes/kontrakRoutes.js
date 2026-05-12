// backend\backend\src\routes\kontrakRoutes.js
const express = require('express');
const router = express.Router();

const kontrakController = require('../controllers/kontrakController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

const {
    kontrakIdParamValidator,
    createKontrakValidator,
    updateKontrakValidator
} = require('../validators/kontrakValidator');

// Semua manajemen kontrak khusus admin
router.get('/', verifyToken, isAdmin, kontrakController.getAllKontrak);

// Admin: akhiri kontrak
router.put(
    '/:id/akhiri',
    verifyToken,
    isAdmin,
    kontrakIdParamValidator,
    handleValidationErrors,
    kontrakController.akhiriKontrak
);

router.get(
    '/:id',
    verifyToken,
    isAdmin,
    kontrakIdParamValidator,
    handleValidationErrors,
    kontrakController.getKontrakById
);

router.post(
    '/',
    verifyToken,
    isAdmin,
    createKontrakValidator,
    handleValidationErrors,
    kontrakController.createKontrak
);

router.put(
    '/:id',
    verifyToken,
    isAdmin,
    updateKontrakValidator,
    handleValidationErrors,
    kontrakController.updateKontrak
);

router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    kontrakIdParamValidator,
    handleValidationErrors,
    kontrakController.deleteKontrak
);

module.exports = router;