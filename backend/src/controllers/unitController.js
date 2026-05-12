//backend\backend\src\controllers\unitController.js
const unitModel = require('../models/unitModel');

// GET /api/unit
const getAllUnits = async (req, res) => {
    try {
        const units = await unitModel.getAllUnits();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data unit',
            data: units
        });
    } catch (error) {
        console.error('Error getAllUnits:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data unit',
            error: error.message
        });
    }
};

// GET /api/unit/:id
const getUnitById = async (req, res) => {
    try {
        const { id } = req.params;

        const unit = await unitModel.getUnitById(id);

        if (!unit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail unit',
            data: unit
        });
    } catch (error) {
        console.error('Error getUnitById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail unit',
            error: error.message
        });
    }
};

// POST /api/unit
const createUnit = async (req, res) => {
    try {
        const { nama_unit, tipe, harga, status, lantai } = req.body || {};

        if (!nama_unit || !tipe || !harga) {
            return res.status(400).json({
                success: false,
                message: 'Nama unit, tipe, dan harga wajib diisi'
            });
        }

        const allowedStatus = ['tersedia', 'terisi'];
        const finalStatus = status || 'tersedia';

        if (!allowedStatus.includes(finalStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Status unit harus tersedia atau terisi'
            });
        }

        const newUnit = await unitModel.createUnit(
            nama_unit,
            tipe,
            harga,
            finalStatus,
            lantai || null
        );

        res.status(201).json({
            success: true,
            message: 'Unit berhasil ditambahkan',
            data: newUnit
        });
    } catch (error) {
        console.error('Error createUnit:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan unit',
            error: error.message
        });
    }
};

// PUT /api/unit/:id
const updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_unit, tipe, harga, status, lantai } = req.body || {};

        if (!nama_unit || !tipe || !harga || !status) {
            return res.status(400).json({
                success: false,
                message: 'Nama unit, tipe, harga, dan status wajib diisi'
            });
        }

        const allowedStatus = ['tersedia', 'terisi'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status unit harus tersedia atau terisi'
            });
        }

        const updatedUnit = await unitModel.updateUnit(
            id,
            nama_unit,
            tipe,
            harga,
            status,
            lantai || null
        );

        if (!updatedUnit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Unit berhasil diperbarui',
            data: updatedUnit
        });
    } catch (error) {
        console.error('Error updateUnit:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui unit',
            error: error.message
        });
    }
};

// DELETE /api/unit/:id
const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUnit = await unitModel.deleteUnit(id);

        if (!deletedUnit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Unit berhasil dihapus',
            data: deletedUnit
        });
    } catch (error) {
        console.error('Error deleteUnit:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus unit',
            error: error.message
        });
    }
};

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
};