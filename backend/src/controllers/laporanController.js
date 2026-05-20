// backend\backend\src\controllers\laporanController.js
const laporanModel = require('../models/laporanModel');

// GET /api/laporan/keuangan
const getLaporanKeuangan = async (req, res) => {
    try {
        const { bulan, tahun } = req.query || {};

        if ((bulan && !tahun) || (!bulan && tahun)) {
            return res.status(400).json({
                success: false,
                message: 'Filter bulan dan tahun harus diisi bersamaan'
            });
        }

        const laporan = await laporanModel.getLaporanKeuangan(bulan, tahun);
        const ringkasan = await laporanModel.getRingkasanLaporanKeuangan(bulan, tahun);

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil laporan keuangan',
            filter: {
                bulan: bulan || null,
                tahun: tahun || null,
                periode: bulan && tahun ? `${bulan} ${tahun}` : 'Semua periode'
            },
            data: {
                ringkasan: {
                    jumlah_transaksi: Number(ringkasan.jumlah_transaksi),
                    total_biaya_sewa: Number(ringkasan.total_biaya_sewa),
                    total_biaya_listrik: Number(ringkasan.total_biaya_listrik),
                    total_biaya_air: Number(ringkasan.total_biaya_air),
                    total_pemasukan: Number(ringkasan.total_pemasukan),
                    total_belum_lunas: Number(ringkasan.total_belum_lunas),
                    jumlah_unit_tertagih: Number(ringkasan.jumlah_unit_tertagih)
                },
                laporan
            }
        });
    } catch (error) {
        console.error('Error getLaporanKeuangan:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil laporan keuangan',
            error: error.message
        });
    }
};

module.exports = {
    getLaporanKeuangan
};