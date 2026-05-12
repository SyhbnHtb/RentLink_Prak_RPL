// backend\backend\src\controllers\pembayaranController.js
const pembayaranModel = require('../models/pembayaranModel');

// POST /api/pembayaran/upload
const uploadBuktiPembayaran = async (req, res) => {
    try {
        const { tagihan_id } = req.body || {};

        if (!tagihan_id) {
            return res.status(400).json({
                success: false,
                message: 'tagihan_id wajib diisi'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File bukti pembayaran wajib diupload'
            });
        }

        if (req.user.role !== 'penyewa') {
            return res.status(403).json({
                success: false,
                message: 'Upload bukti pembayaran hanya dapat dilakukan oleh penyewa'
            });
        }

        const tagihan = await pembayaranModel.getTagihanWithOwnerById(tagihan_id);

        if (!tagihan) {
            return res.status(404).json({
                success: false,
                message: 'Tagihan tidak ditemukan'
            });
        }

        if (Number(tagihan.user_id) !== Number(req.user.id_user)) {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak! Kamu tidak boleh membayar tagihan milik penyewa lain.'
            });
        }

        if (tagihan.status === 'lunas') {
            return res.status(400).json({
                success: false,
                message: 'Tagihan ini sudah lunas'
            });
        }

        const activePembayaran = await pembayaranModel.getActivePembayaranByTagihanId(tagihan_id);

        if (activePembayaran) {
            return res.status(400).json({
                success: false,
                message: 'Tagihan ini sudah memiliki pembayaran yang sedang diproses atau sudah lunas'
            });
        }

        const tanggal = new Date().toISOString().split('T')[0];
        const buktiPath = `/uploads/${req.file.filename}`;

        const newPembayaran = await pembayaranModel.createPembayaran(
            tagihan_id,
            tanggal,
            buktiPath,
            'pending'
        );

        res.status(201).json({
            success: true,
            message: 'Bukti pembayaran berhasil diupload dan menunggu verifikasi admin',
            data: {
                pembayaran: newPembayaran,
                tagihan: {
                    id_tagihan: tagihan.id_tagihan,
                    periode: tagihan.periode,
                    total: tagihan.total,
                    status: 'pending',
                    nama_penyewa: tagihan.nama_penyewa,
                    nama_unit: tagihan.nama_unit
                }
            }
        });
    } catch (error) {
        console.error('Error uploadBuktiPembayaran:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal upload bukti pembayaran',
            error: error.message
        });
    }
};

// GET /api/pembayaran
const getAllPembayaran = async (req, res) => {
    try {
        const pembayaran = await pembayaranModel.getAllPembayaran();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data pembayaran',
            data: pembayaran
        });
    } catch (error) {
        console.error('Error getAllPembayaran:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data pembayaran',
            error: error.message
        });
    }
};

// GET /api/pembayaran/:id
const getPembayaranById = async (req, res) => {
    try {
        const { id } = req.params;

        const pembayaran = await pembayaranModel.getPembayaranById(id);

        if (!pembayaran) {
            return res.status(404).json({
                success: false,
                message: 'Data pembayaran tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail pembayaran',
            data: pembayaran
        });
    } catch (error) {
        console.error('Error getPembayaranById:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail pembayaran',
            error: error.message
        });
    }
};

// PUT /api/pembayaran/verifikasi/:id
const verifyPembayaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body || {};

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status verifikasi wajib diisi'
            });
        }

        const allowedStatus = ['lunas', 'ditolak'];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status verifikasi harus lunas atau ditolak'
            });
        }

        const pembayaran = await pembayaranModel.getPembayaranById(id);

        if (!pembayaran) {
            return res.status(404).json({
                success: false,
                message: 'Data pembayaran tidak ditemukan'
            });
        }

        if (pembayaran.status_pembayaran === 'lunas') {
            return res.status(400).json({
                success: false,
                message: 'Pembayaran ini sudah diverifikasi lunas'
            });
        }

        if (pembayaran.status_pembayaran === 'ditolak') {
            return res.status(400).json({
                success: false,
                message: 'Pembayaran ini sudah pernah ditolak'
            });
        }

        const updatedPembayaran = await pembayaranModel.verifyPembayaran(id, status);
        const updatedDetail = await pembayaranModel.getPembayaranById(id);

        res.status(200).json({
            success: true,
            message:
                status === 'lunas'
                    ? 'Pembayaran berhasil diverifikasi sebagai lunas'
                    : 'Pembayaran berhasil ditolak',
            data: {
                pembayaran: updatedPembayaran,
                detail: updatedDetail
            }
        });
    } catch (error) {
        console.error('Error verifyPembayaran:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal memverifikasi pembayaran',
            error: error.message
        });
    }
};

// GET /api/pembayaran/riwayat
const getRiwayatPembayaranAdmin = async (req, res) => {
    try {
        const { search, status, bulan, tahun, sort } = req.query || {};

        if ((bulan && !tahun) || (!bulan && tahun)) {
            return res.status(400).json({
                success: false,
                message: 'Filter bulan dan tahun harus diisi bersamaan'
            });
        }

        const allowedStatus = ['pending', 'ditolak', 'lunas'];

        if (status && !allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status pembayaran harus pending, ditolak, atau lunas'
            });
        }

        const riwayat = await pembayaranModel.getRiwayatPembayaranAdmin({
            search,
            status,
            bulan,
            tahun,
            sort
        });

        const formattedRiwayat = riwayat.map((item) => ({
            ...item,
            kode_invoice: `INV-${String(item.tagihan_id).padStart(3, '0')}`,
            kode_kontrak: `C-${String(item.id_kontrak).padStart(3, '0')}`,
            biaya_sewa: Number(item.biaya_sewa),
            biaya_listrik: Number(item.biaya_listrik),
            biaya_air: Number(item.biaya_air),
            total: Number(item.total)
        }));

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil seluruh riwayat pembayaran',
            filter: {
                search: search || null,
                status: status || null,
                bulan: bulan || null,
                tahun: tahun || null,
                sort: sort || 'terbaru'
            },
            data: formattedRiwayat
        });
    } catch (error) {
        console.error('Error getRiwayatPembayaranAdmin:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat pembayaran',
            error: error.message
        });
    }
};

// GET /api/pembayaran/riwayat/me
const getRiwayatPembayaranSaya = async (req, res) => {
    try {
        const userId = req.user.id_user;
        const { status, bulan, tahun, sort } = req.query || {};

        if ((bulan && !tahun) || (!bulan && tahun)) {
            return res.status(400).json({
                success: false,
                message: 'Filter bulan dan tahun harus diisi bersamaan'
            });
        }

        const allowedStatus = ['pending', 'ditolak', 'lunas'];

        if (status && !allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status pembayaran harus pending, ditolak, atau lunas'
            });
        }

        const riwayat = await pembayaranModel.getRiwayatPembayaranByUserId(
            userId,
            { status, bulan, tahun, sort }
        );

        const formattedRiwayat = riwayat.map((item) => ({
            ...item,
            kode_invoice: `INV-${String(item.tagihan_id).padStart(3, '0')}`,
            kode_kontrak: `C-${String(item.id_kontrak).padStart(3, '0')}`,
            biaya_sewa: Number(item.biaya_sewa),
            biaya_listrik: Number(item.biaya_listrik),
            biaya_air: Number(item.biaya_air),
            total: Number(item.total)
        }));

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil riwayat pembayaran milik penyewa',
            filter: {
                status: status || null,
                bulan: bulan || null,
                tahun: tahun || null,
                sort: sort || 'terbaru'
            },
            data: formattedRiwayat
        });
    } catch (error) {
        console.error('Error getRiwayatPembayaranSaya:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat pembayaran penyewa',
            error: error.message
        });
    }
};

module.exports = {
    uploadBuktiPembayaran,
    getAllPembayaran,
    getPembayaranById,
    verifyPembayaran,
    getRiwayatPembayaranAdmin,
    getRiwayatPembayaranSaya
};