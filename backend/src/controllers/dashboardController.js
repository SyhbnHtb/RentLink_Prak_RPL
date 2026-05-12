// backend\backend\src\controllers\dashboardController.js
const dashboardModel = require('../models/dashboardModel');

// GET /api/dashboard/admin/stats
const getAdminDashboardStats = async (req, res) => {
    try {
        const stats = await dashboardModel.getAdminDashboardStats();
        const recentTagihan = await dashboardModel.getRecentTagihan();
        const recentPembayaran = await dashboardModel.getRecentPembayaran();

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil statistik dashboard admin',
            data: {
                statistik: {
                    total_unit: Number(stats.total_unit),
                    unit_tersedia: Number(stats.unit_tersedia),
                    unit_terisi: Number(stats.unit_terisi),

                    total_penyewa: Number(stats.total_penyewa),

                    total_kontrak: Number(stats.total_kontrak),
                    kontrak_aktif: Number(stats.kontrak_aktif),
                    kontrak_selesai: Number(stats.kontrak_selesai),

                    total_tagihan: Number(stats.total_tagihan),
                    tagihan_belum: Number(stats.tagihan_belum),
                    tagihan_pending: Number(stats.tagihan_pending),
                    tagihan_lunas: Number(stats.tagihan_lunas),

                    total_pembayaran: Number(stats.total_pembayaran),
                    pembayaran_pending: Number(stats.pembayaran_pending),
                    pembayaran_ditolak: Number(stats.pembayaran_ditolak),
                    pembayaran_lunas: Number(stats.pembayaran_lunas),

                    total_pemasukan: Number(stats.total_pemasukan)
                },
                tagihan_terbaru: recentTagihan,
                pembayaran_terbaru: recentPembayaran
            }
        });
    } catch (error) {
        console.error('Error getAdminDashboardStats:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil statistik dashboard admin',
            error: error.message
        });
    }
};

// GET /api/dashboard/penyewa/stats
const getPenyewaDashboardStats = async (req, res) => {
    try {
        const userId = req.user.id_user;

        if (req.user.role !== 'penyewa') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak! Dashboard ini hanya untuk penyewa.'
            });
        }

        const stats = await dashboardModel.getPenyewaDashboardStats(userId);
        const ringkasanPembayaran = await dashboardModel.getPenyewaRingkasanPembayaran(userId);
        const riwayatTerbaru = await dashboardModel.getPenyewaRiwayatTerbaru(userId);

        if (!stats) {
            return res.status(200).json({
                success: true,
                message: 'Penyewa belum memiliki kontrak aktif',
                data: {
                    ringkasan: {
                        unit: null,
                        tagihan_aktif: null,
                        total_tagihan: 0,
                        status_pembayaran: null
                    },
                    pembayaran_terbaru: [],
                    riwayat_pembayaran: []
                }
            });
        }

        const statusPembayaran =
            stats.status_pembayaran ||
            stats.status_tagihan ||
            'belum';

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil statistik dashboard penyewa',
            data: {
                ringkasan: {
                    unit: {
                        id_unit: stats.id_unit,
                        nama_unit: stats.nama_unit,
                        tipe: stats.tipe,
                        lantai: stats.lantai,
                        harga: Number(stats.harga),
                        status_unit: stats.status_unit
                    },
                    kontrak: {
                        id_kontrak: stats.id_kontrak,
                        kode_kontrak: `C-${String(stats.id_kontrak).padStart(3, '0')}`,
                        tgl_mulai: stats.tgl_mulai,
                        tgl_akhir: stats.tgl_akhir,
                        status_kontrak: stats.status_kontrak
                    },
                    tagihan_aktif: stats.id_tagihan
                        ? {
                            id_tagihan: stats.id_tagihan,
                            kode_invoice: `INV-${String(stats.id_tagihan).padStart(3, '0')}`,
                            periode: stats.periode,
                            biaya_sewa: Number(stats.biaya_sewa),
                            biaya_listrik: Number(stats.biaya_listrik),
                            biaya_air: Number(stats.biaya_air),
                            total: Number(stats.total),
                            status_tagihan: stats.status_tagihan
                        }
                        : null,
                    total_tagihan: stats.total ? Number(stats.total) : 0,
                    status_pembayaran: statusPembayaran
                },
                pembayaran_terbaru: ringkasanPembayaran.map((item) => ({
                    ...item,
                    kode_invoice: item.id_tagihan
                        ? `INV-${String(item.id_tagihan).padStart(3, '0')}`
                        : null,
                    kode_kontrak: item.id_kontrak
                        ? `C-${String(item.id_kontrak).padStart(3, '0')}`
                        : null
                })),
                riwayat_pembayaran: riwayatTerbaru.map((item) => ({
                    ...item,
                    kode_invoice: item.tagihan_id
                        ? `INV-${String(item.tagihan_id).padStart(3, '0')}`
                        : null,
                    kode_kontrak: item.id_kontrak
                        ? `C-${String(item.id_kontrak).padStart(3, '0')}`
                        : null
                }))
            }
        });
    } catch (error) {
        console.error('Error getPenyewaDashboardStats:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil statistik dashboard penyewa',
            error: error.message
        });
    }
};

module.exports = {
    getAdminDashboardStats,
    getPenyewaDashboardStats
};