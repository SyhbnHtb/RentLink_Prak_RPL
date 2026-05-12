//backend\backend\src\controllers\penyewaController.js
const bcrypt = require('bcrypt');
const penyewaModel = require('../models/penyewaModel');

// GET /api/penyewa
const getAllPenyewa = async (req, res) => {
    try {
        const penyewa = await penyewaModel.getAllPenyewa();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data penyewa',
            data: penyewa
        });
    } catch (error) {
        console.error('Error getAllPenyewa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data penyewa',
            error: error.message
        });
    }
};

// GET /api/penyewa/:id
const getPenyewaById = async (req, res) => {
    try {
        const { id } = req.params;

        const penyewa = await penyewaModel.getPenyewaById(id);

        if (!penyewa) {
            return res.status(404).json({
                success: false,
                message: 'Penyewa tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail penyewa',
            data: penyewa
        });
    } catch (error) {
        console.error('Error getPenyewaById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail penyewa',
            error: error.message
        });
    }
};

// POST /api/penyewa
const createPenyewa = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Nama, email, dan password wajib diisi'
            });
        }

        const existingUser = await penyewaModel.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newPenyewa = await penyewaModel.createPenyewa(
            name,
            email,
            hashedPassword,
            phone || null
        );

        res.status(201).json({
            success: true,
            message: 'Penyewa berhasil ditambahkan',
            data: newPenyewa
        });
    } catch (error) {
        console.error('Error createPenyewa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menambahkan penyewa',
            error: error.message
        });
    }
};

// PUT /api/penyewa/:id
const updatePenyewa = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Nama dan email wajib diisi'
            });
        }

        const currentPenyewa = await penyewaModel.getPenyewaById(id);

        if (!currentPenyewa) {
            return res.status(404).json({
                success: false,
                message: 'Penyewa tidak ditemukan'
            });
        }

        const existingUser = await penyewaModel.getUserByEmail(email);

        if (existingUser && existingUser.id_user !== Number(id)) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah digunakan oleh user lain'
            });
        }

        const updatedPenyewa = await penyewaModel.updatePenyewa(
            id,
            name,
            email,
            phone || null
        );

        res.status(200).json({
            success: true,
            message: 'Penyewa berhasil diperbarui',
            data: updatedPenyewa
        });
    } catch (error) {
        console.error('Error updatePenyewa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui penyewa',
            error: error.message
        });
    }
};

// DELETE /api/penyewa/:id
const deletePenyewa = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPenyewa = await penyewaModel.deletePenyewa(id);

        if (!deletedPenyewa) {
            return res.status(404).json({
                success: false,
                message: 'Penyewa tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Penyewa berhasil dihapus',
            data: deletedPenyewa
        });
    } catch (error) {
        console.error('Error deletePenyewa:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus penyewa',
            error: error.message
        });
    }
};

// GET /api/penyewa/unit-saya
const getUnitSaya = async (req, res) => {
    try {
        const userId = req.user.id_user;

        if (req.user.role !== 'penyewa') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak! Fitur ini hanya untuk penyewa.'
            });
        }

        const unit = await penyewaModel.getUnitSaya(userId);

        if (!unit) {
            return res.status(200).json({
                success: true,
                message: 'Penyewa belum memiliki unit aktif',
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data unit saya',
            data: {
                ...unit,
                kode_kontrak: `C-${String(unit.id_kontrak).padStart(3, '0')}`,
                harga: Number(unit.harga)
            }
        });
    } catch (error) {
        console.error('Error getUnitSaya:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data unit saya',
            error: error.message
        });
    }
};

// GET /api/penyewa/kontrak-saya
const getKontrakSaya = async (req, res) => {
    try {
        const userId = req.user.id_user;

        if (req.user.role !== 'penyewa') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak! Fitur ini hanya untuk penyewa.'
            });
        }

        const kontrak = await penyewaModel.getKontrakSaya(userId);

        const formattedKontrak = kontrak.map((item) => ({
            ...item,
            kode_kontrak: `C-${String(item.id_kontrak).padStart(3, '0')}`,
            harga: Number(item.harga)
        }));

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data kontrak saya',
            data: formattedKontrak
        });
    } catch (error) {
        console.error('Error getKontrakSaya:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data kontrak saya',
            error: error.message
        });
    }
};

module.exports = {
    getAllPenyewa,
    getPenyewaById,
    createPenyewa,
    updatePenyewa,
    deletePenyewa,
    getUnitSaya,
    getKontrakSaya
};