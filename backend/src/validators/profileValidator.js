// backend\backend\src\validators\profileValidator.js
const { body } = require('express-validator');

const updateProfileValidator = [
    body('name')
        .notEmpty()
        .withMessage('Nama wajib diisi')
        .isLength({ min: 3 })
        .withMessage('Nama minimal 3 karakter'),

    body('email')
        .notEmpty()
        .withMessage('Email wajib diisi')
        .isEmail()
        .withMessage('Format email tidak valid'),

    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 10, max: 20 })
        .withMessage('Nomor telepon harus 10 sampai 20 karakter'),

    body('ktp')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 8, max: 50 })
        .withMessage('KTP harus 8 sampai 50 karakter'),

    body('asal')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 3, max: 100 })
        .withMessage('Asal harus 3 sampai 100 karakter')
];

const changePasswordValidator = [
    body('old_password')
        .notEmpty()
        .withMessage('Password lama wajib diisi'),

    body('new_password')
        .notEmpty()
        .withMessage('Password baru wajib diisi')
        .isLength({ min: 6 })
        .withMessage('Password baru minimal 6 karakter'),

    body('confirm_password')
        .notEmpty()
        .withMessage('Konfirmasi password wajib diisi')
        .custom((value, { req }) => {
            if (value !== req.body.new_password) {
                throw new Error('Konfirmasi password tidak sama dengan password baru');
            }
            return true;
        })
];

module.exports = {
    updateProfileValidator,
    changePasswordValidator
};