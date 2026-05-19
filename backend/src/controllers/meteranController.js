// backend\backend\src\controllers\meteranController.js
const meteranModel = require('../models/meteranModel');

// GET /api/meteran
const getAllMeteran = async (req, res) => {
    try {
        const meteran = await meteranModel.getAllMeteran();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data meteran',
            data: meteran
        });
    } catch (error) {
        console.error('Error getAllMeteran:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data meteran',
            error: error.message
        });
    }
};

// GET /api/meteran/:id
const getMeteranById = async (req, res) => {
    try {
        const { id } = req.params;

        const meteran = await meteranModel.getMeteranById(id);

        if (!meteran) {
            return res.status(404).json({
                success: false,
                message: 'Data meteran tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail meteran',
            data: meteran
        });
    } catch (error) {
        console.error('Error getMeteranById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail meteran',
            error: error.message
        });
    }
};

// POST /api/meteran
const createMeteran = async (req, res) => {
    try {
        const {
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
        } = req.body || {};

        if (
            !unit_id ||
            !bulan ||
            !tahun ||
            meter_listrik_awal === undefined ||
            meter_listrik_akhir === undefined ||
            meter_air_awal === undefined ||
            meter_air_akhir === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: 'unit_id, bulan, tahun, meter listrik, dan meter air wajib diisi'
            });
        }

        if (Number(meter_listrik_akhir) < Number(meter_listrik_awal)) {
            return res.status(400).json({
                success: false,
                message: 'Meter listrik akhir tidak boleh lebih kecil dari meter listrik awal'
            });
        }

        if (Number(meter_air_akhir) < Number(meter_air_awal)) {
            return res.status(400).json({
                success: false,
                message: 'Meter air akhir tidak boleh lebih kecil dari meter air awal'
            });
        }

        const unit = await meteranModel.getUnitById(unit_id);

        if (!unit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        const existingMeteran = await meteranModel.getMeteranByUnitPeriode(
            unit_id,
            bulan,
            tahun
        );

        if (existingMeteran) {
            return res.status(400).json({
                success: false,
                message: 'Data meteran untuk unit, bulan, dan tahun tersebut sudah ada'
            });
        }

        const newMeteran = await meteranModel.createMeteran(
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
        );

        res.status(201).json({
            success: true,
            message: 'Data meteran berhasil ditambahkan',
            data: newMeteran
        });
    } catch (error) {
        console.error('Error createMeteran:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan data meteran',
            error: error.message
        });
    }
};

// PUT /api/meteran/:id
const updateMeteran = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
        } = req.body || {};

        if (
            !unit_id ||
            !bulan ||
            !tahun ||
            meter_listrik_awal === undefined ||
            meter_listrik_akhir === undefined ||
            meter_air_awal === undefined ||
            meter_air_akhir === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: 'unit_id, bulan, tahun, meter listrik, dan meter air wajib diisi'
            });
        }

        const currentMeteran = await meteranModel.getMeteranById(id);

        if (!currentMeteran) {
            return res.status(404).json({
                success: false,
                message: 'Data meteran tidak ditemukan'
            });
        }

        if (Number(meter_listrik_akhir) < Number(meter_listrik_awal)) {
            return res.status(400).json({
                success: false,
                message: 'Meter listrik akhir tidak boleh lebih kecil dari meter listrik awal'
            });
        }

        if (Number(meter_air_akhir) < Number(meter_air_awal)) {
            return res.status(400).json({
                success: false,
                message: 'Meter air akhir tidak boleh lebih kecil dari meter air awal'
            });
        }

        const unit = await meteranModel.getUnitById(unit_id);

        if (!unit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        const existingMeteran = await meteranModel.getMeteranByUnitPeriode(
            unit_id,
            bulan,
            tahun
        );

        if (existingMeteran && Number(existingMeteran.id_meteran) !== Number(id)) {
            return res.status(400).json({
                success: false,
                message: 'Data meteran untuk unit, bulan, dan tahun tersebut sudah ada'
            });
        }

        const updatedMeteran = await meteranModel.updateMeteran(
            id,
            unit_id,
            bulan,
            tahun,
            meter_listrik_awal,
            meter_listrik_akhir,
            meter_air_awal,
            meter_air_akhir
        );

        res.status(200).json({
            success: true,
            message: 'Data meteran berhasil diperbarui',
            data: updatedMeteran
        });
    } catch (error) {
        console.error('Error updateMeteran:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui data meteran',
            error: error.message
        });
    }
};

// DELETE /api/meteran/:id
const deleteMeteran = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMeteran = await meteranModel.deleteMeteran(id);

        if (!deletedMeteran) {
            return res.status(404).json({
                success: false,
                message: 'Data meteran tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data meteran berhasil dihapus',
            data: deletedMeteran
        });
    } catch (error) {
        console.error('Error deleteMeteran:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus data meteran',
            error: error.message
        });
    }
};

// GET /api/meteran/me
const getMeteranSaya = async (req, res) => {
    try {
        const userId = req.user.id_user;
        const meteran = await meteranModel.getMeteranByUserId(userId);

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data meteran saya',
            data: meteran
        });
    } catch (error) {
        console.error('Error getMeteranSaya:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data meteran',
            error: error.message
        });
    }
};

module.exports = {
    getAllMeteran,
    getMeteranById,
    createMeteran,
    updateMeteran,
    deleteMeteran,
    getMeteranSaya
};