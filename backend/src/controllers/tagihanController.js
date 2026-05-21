// backend\backend\src\controllers\tagihanController.js
const tagihanModel = require('../models/tagihanModel');

// POST /api/tagihan/generate
const generateTagihan = async (req, res) => {
    try {
        const { kontrak_id, bulan, tahun } = req.body || {};

        if (!bulan || !tahun) {
            return res.status(400).json({
                success: false,
                message: 'Bulan dan tahun wajib diisi'
            });
        }

        const tarifListrik = Number(process.env.TARIF_LISTRIK_PER_KWH || 1500);
        const tarifAir = Number(process.env.TARIF_AIR_PER_M3 || 5000);
        const periode = `${bulan} ${tahun}`;

        let daftarKontrak = [];

        if (kontrak_id) {
            const kontrak = await tagihanModel.getActiveKontrakById(kontrak_id);

            if (!kontrak) {
                return res.status(404).json({
                    success: false,
                    message: 'Kontrak aktif tidak ditemukan'
                });
            }

            daftarKontrak = [kontrak];
        } else {
            daftarKontrak = await tagihanModel.getAllActiveKontrak();

            if (daftarKontrak.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Tidak ada kontrak aktif yang dapat dibuatkan tagihan'
                });
            }
        }

        const hasilGenerate = [];
        const gagalGenerate = [];

        for (const kontrak of daftarKontrak) {
            const existingTagihan = await tagihanModel.getTagihanByKontrakPeriode(
                kontrak.id_kontrak,
                periode
            );

            if (existingTagihan) {
                gagalGenerate.push({
                    kontrak_id: kontrak.id_kontrak,
                    nama_penyewa: kontrak.nama_penyewa,
                    nama_unit: kontrak.nama_unit,
                    alasan: 'Tagihan untuk periode ini sudah pernah dibuat'
                });

                continue;
            }

            const meteran = await tagihanModel.getMeteranByUnitPeriode(
                kontrak.unit_id,
                bulan,
                tahun
            );

            if (!meteran) {
                gagalGenerate.push({
                    kontrak_id: kontrak.id_kontrak,
                    nama_penyewa: kontrak.nama_penyewa,
                    nama_unit: kontrak.nama_unit,
                    alasan: 'Data meteran untuk unit dan periode ini belum tersedia'
                });

                continue;
            }

            const pemakaianListrik =
                Number(meteran.meter_listrik_akhir) - Number(meteran.meter_listrik_awal);

            const pemakaianAir =
                Number(meteran.meter_air_akhir) - Number(meteran.meter_air_awal);

            if (pemakaianListrik < 0 || pemakaianAir < 0) {
                gagalGenerate.push({
                    kontrak_id: kontrak.id_kontrak,
                    nama_penyewa: kontrak.nama_penyewa,
                    nama_unit: kontrak.nama_unit,
                    alasan: 'Data meteran tidak valid karena meter akhir lebih kecil dari meter awal'
                });

                continue;
            }

            const biayaSewa = Number(kontrak.harga);
            const biayaListrik = pemakaianListrik * tarifListrik;
            const biayaAir = pemakaianAir * tarifAir;
            const total = biayaSewa + biayaListrik + biayaAir;

            const newTagihan = await tagihanModel.createTagihan(
                kontrak.id_kontrak,
                periode,
                biayaSewa,
                biayaListrik,
                biayaAir,
                total,
                'belum'
            );

            hasilGenerate.push({
                ...newTagihan,
                nama_penyewa: kontrak.nama_penyewa,
                nama_unit: kontrak.nama_unit,
                pemakaian_listrik: pemakaianListrik,
                pemakaian_air: pemakaianAir,
                tarif_listrik: tarifListrik,
                tarif_air: tarifAir
            });
        }

        res.status(201).json({
            success: true,
            message: 'Proses generate tagihan selesai',
            periode: periode,
            jumlah_berhasil: hasilGenerate.length,
            jumlah_gagal: gagalGenerate.length,
            data: {
                berhasil: hasilGenerate,
                gagal: gagalGenerate
            }
        });
    } catch (error) {
        console.error('Error generateTagihan:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal generate tagihan',
            error: error.message
        });
    }
};

// GET /api/tagihan
const getAllTagihan = async (req, res) => {
    try {
        const { search, status, bulan, tahun, sort } = req.query || {};
        const tagihan = await tagihanModel.getAllTagihan({ search, status, bulan, tahun, sort });

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil semua data tagihan',
            data: tagihan
        });
    } catch (error) {
        console.error('Error getAllTagihan:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data tagihan',
            error: error.message
        });
    }
};

// GET /api/tagihan/me
const getMyTagihan = async (req, res) => {
    try {
        const userId = req.user.id_user;

        const tagihan = await tagihanModel.getTagihanByUserId(userId);

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data tagihan milik penyewa',
            data: tagihan
        });
    } catch (error) {
        console.error('Error getMyTagihan:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data tagihan penyewa',
            error: error.message
        });
    }
};

// GET /api/tagihan/:id
const getTagihanById = async (req, res) => {
    try {
        const { id } = req.params;

        const tagihan = await tagihanModel.getTagihanById(id);

        if (!tagihan) {
            return res.status(404).json({
                success: false,
                message: 'Tagihan tidak ditemukan'
            });
        }

        if (
            req.user.role === 'penyewa' &&
            Number(tagihan.user_id) !== Number(req.user.id_user)
        ) {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak! Kamu tidak boleh melihat tagihan milik penyewa lain.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil detail tagihan',
            data: tagihan
        });
    } catch (error) {
        console.error('Error getTagihanById:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil detail tagihan',
            error: error.message
        });
    }
};

// DELETE /api/tagihan/:id
const deleteTagihan = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await tagihanModel.deleteTagihan(id);

        if (result.status === 'not_found') {
            return res.status(404).json({
                success: false,
                message: 'Tagihan tidak ditemukan'
            });
        }

        if (result.status === 'lunas') {
            return res.status(400).json({
                success: false,
                message: 'Tagihan yang sudah lunas tidak boleh dihapus karena sudah masuk riwayat transaksi',
                data: result.data
            });
        }

        res.status(200).json({
            success: true,
            message: 'Tagihan berhasil dihapus',
            data: result.data
        });
    } catch (error) {
        console.error('Error deleteTagihan:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal menghapus tagihan',
            error: error.message
        });
    }
};

module.exports = {
    generateTagihan,
    getAllTagihan,
    getMyTagihan,
    getTagihanById,
    deleteTagihan
};