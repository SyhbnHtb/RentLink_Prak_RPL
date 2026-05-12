// backend\backend\src\routes\unitRoutes.js
const express = require('express');
const router = express.Router();

const unitController = require('../controllers/unitController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Semua user yang sudah login bisa melihat unit
router.get('/', verifyToken, unitController.getAllUnits);
router.get('/:id', verifyToken, unitController.getUnitById);

// Hanya admin yang bisa tambah, update, hapus unit
router.post('/', verifyToken, isAdmin, unitController.createUnit);
router.put('/:id', verifyToken, isAdmin, unitController.updateUnit);
router.delete('/:id', verifyToken, isAdmin, unitController.deleteUnit);

module.exports = router;