//backend\backend\src\controllers\kontrakController.js
const kontrakModel = require('../models/kontrakModel');

// GET /api/kontrak
const getAllKontrak = async (req, res) => {
    try {
        const kontrak = await kontrakModel.getAllKontrak();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data kontrak',
            data: kontrak
        });
    } catch (error) {
        console.error('Error getAllKontrak:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data kontrak',
            error: error.message
        });
    }
};

// GET /api/kontrak/:id
const getKontrakById = async (req, res) => {
    try {
        const { id } = req.params;

        const kontrak = await kontrakModel.getKontrakById(id);

        if (!kontrak) {
            return res.status(404).json({
                success: false,
                message: 'Kontrak tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail kontrak',
            data: kontrak
        });
    } catch (error) {
        console.error('Error getKontrakById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail kontrak',
            error: error.message
        });
    }
};

// POST /api/kontrak
const createKontrak = async (req, res) => {
    try {
        const { user_id, unit_id, tgl_mulai, tgl_akhir, status } = req.body || {};

        if (!user_id || !unit_id || !tgl_mulai || !tgl_akhir) {
            return res.status(400).json({
                success: false,
                message: 'user_id, unit_id, tgl_mulai, dan tgl_akhir wajib diisi'
            });
        }

        const allowedStatus = ['aktif', 'selesai'];
        const finalStatus = status || 'aktif';

        if (!allowedStatus.includes(finalStatus)) {
            return res.status(400).json({
                success: false,
                message: 'Status kontrak harus aktif atau selesai'
            });
        }

        const penyewa = await kontrakModel.getPenyewaById(user_id);
        if (!penyewa) {
            return res.status(404).json({
                success: false,
                message: 'Penyewa tidak ditemukan atau user bukan penyewa'
            });
        }

        const unit = await kontrakModel.getUnitById(unit_id);
        if (!unit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        if (unit.status === 'terisi' && finalStatus === 'aktif') {
            return res.status(400).json({
                success: false,
                message: 'Unit sudah terisi dan tidak bisa dibuat kontrak aktif baru'
            });
        }

        const newKontrak = await kontrakModel.createKontrak(
            user_id,
            unit_id,
            tgl_mulai,
            tgl_akhir,
            finalStatus
        );

        res.status(201).json({
            success: true,
            message: 'Kontrak berhasil ditambahkan',
            data: newKontrak
        });
    } catch (error) {
        console.error('Error createKontrak:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan kontrak',
            error: error.message
        });
    }
};

// PUT /api/kontrak/:id
const updateKontrak = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, unit_id, tgl_mulai, tgl_akhir, status } = req.body || {};

        if (!user_id || !unit_id || !tgl_mulai || !tgl_akhir || !status) {
            return res.status(400).json({
                success: false,
                message: 'user_id, unit_id, tgl_mulai, tgl_akhir, dan status wajib diisi'
            });
        }

        const allowedStatus = ['aktif', 'selesai'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status kontrak harus aktif atau selesai'
            });
        }

        const existingKontrak = await kontrakModel.getKontrakById(id);
        if (!existingKontrak) {
            return res.status(404).json({
                success: false,
                message: 'Kontrak tidak ditemukan'
            });
        }

        const penyewa = await kontrakModel.getPenyewaById(user_id);
        if (!penyewa) {
            return res.status(404).json({
                success: false,
                message: 'Penyewa tidak ditemukan atau user bukan penyewa'
            });
        }

        const unit = await kontrakModel.getUnitById(unit_id);
        if (!unit) {
            return res.status(404).json({
                success: false,
                message: 'Unit tidak ditemukan'
            });
        }

        if (
            unit.status === 'terisi' &&
            Number(existingKontrak.unit_id) !== Number(unit_id) &&
            status === 'aktif'
        ) {
            return res.status(400).json({
                success: false,
                message: 'Unit tujuan sudah terisi'
            });
        }

        const updatedKontrak = await kontrakModel.updateKontrak(
            id,
            user_id,
            unit_id,
            tgl_mulai,
            tgl_akhir,
            status
        );

        res.status(200).json({
            success: true,
            message: 'Kontrak berhasil diperbarui',
            data: updatedKontrak
        });
    } catch (error) {
        console.error('Error updateKontrak:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui kontrak',
            error: error.message
        });
    }
};

// DELETE /api/kontrak/:id
const deleteKontrak = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedKontrak = await kontrakModel.deleteKontrak(id);

        if (!deletedKontrak) {
            return res.status(404).json({
                success: false,
                message: 'Kontrak tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Kontrak berhasil dihapus',
            data: deletedKontrak
        });
    } catch (error) {
        console.error('Error deleteKontrak:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus kontrak',
            error: error.message
        });
    }
};

// PUT /api/kontrak/:id/akhiri
const akhiriKontrak = async (req, res) => {
    try {
        const { id } = req.params;

        const existingKontrak = await kontrakModel.getKontrakById(id);

        if (!existingKontrak) {
            return res.status(404).json({
                success: false,
                message: 'Kontrak tidak ditemukan'
            });
        }

        if (existingKontrak.status === 'selesai') {
            return res.status(400).json({
                success: false,
                message: 'Kontrak sudah selesai'
            });
        }

        const updatedKontrak = await kontrakModel.akhiriKontrak(id);

        res.status(200).json({
            success: true,
            message: 'Kontrak berhasil diakhiri dan unit kembali tersedia',
            data: updatedKontrak
        });
    } catch (error) {
        console.error('Error akhiriKontrak:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengakhiri kontrak',
            error: error.message
        });
    }
};

module.exports = {
    getAllKontrak,
    getKontrakById,
    createKontrak,
    updateKontrak,
    deleteKontrak,
    akhiriKontrak
};