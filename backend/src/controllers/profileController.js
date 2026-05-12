// backend\backend\src\controllers\profileController.js
const bcrypt = require('bcrypt');
const profileModel = require('../models/profileModel');

// GET /api/profile/me
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id_user;

        const profile = await profileModel.getProfileById(userId);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil profile',
            data: profile
        });
    } catch (error) {
        console.error('Error getMyProfile:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengambil profile',
            error: error.message
        });
    }
};

// PUT /api/profile/me
const updateMyProfile = async (req, res) => {
    try {
        const userId = req.user.id_user;
        const { name, email, phone, ktp, asal } = req.body || {};

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: 'Nama dan email wajib diisi'
            });
        }

        const currentUser = await profileModel.getProfileById(userId);

        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: 'Profile tidak ditemukan'
            });
        }

        const existingEmail = await profileModel.getUserByEmail(email);

        if (existingEmail && Number(existingEmail.id_user) !== Number(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah digunakan oleh user lain'
            });
        }

        const updatedProfile = await profileModel.updateProfile(
            userId,
            name,
            email,
            phone || null,
            ktp || null,
            asal || null
        );

        res.status(200).json({
            success: true,
            message: 'Profile berhasil diperbarui',
            data: updatedProfile
        });
    } catch (error) {
        console.error('Error updateMyProfile:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal memperbarui profile',
            error: error.message
        });
    }
};

// PUT /api/profile/change-password
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id_user;
        const { old_password, new_password, confirm_password } = req.body || {};

        if (!old_password || !new_password || !confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Password lama, password baru, dan konfirmasi password wajib diisi'
            });
        }

        if (new_password !== confirm_password) {
            return res.status(400).json({
                success: false,
                message: 'Konfirmasi password tidak sama dengan password baru'
            });
        }

        if (new_password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password baru minimal 6 karakter'
            });
        }

        const user = await profileModel.getUserWithPasswordById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User tidak ditemukan'
            });
        }

        const isOldPasswordMatch = await bcrypt.compare(old_password, user.password);

        if (!isOldPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password lama salah'
            });
        }

        const isSamePassword = await bcrypt.compare(new_password, user.password);

        if (isSamePassword) {
            return res.status(400).json({
                success: false,
                message: 'Password baru tidak boleh sama dengan password lama'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(new_password, saltRounds);

        const updatedUser = await profileModel.updatePassword(userId, hashedPassword);

        res.status(200).json({
            success: true,
            message: 'Password berhasil diganti',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error changePassword:', error.message);

        res.status(500).json({
            success: false,
            message: 'Gagal mengganti password',
            error: error.message
        });
    }
};

module.exports = {
    getMyProfile,
    updateMyProfile,
    changePassword
};