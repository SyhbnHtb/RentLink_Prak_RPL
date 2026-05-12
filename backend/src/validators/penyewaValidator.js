// backend\backend\src\validators\penyewaValidator.js
const { body, param } = require('express-validator');

const penyewaIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID penyewa harus berupa angka positif')
];

const createPenyewaValidator = [
    body('name')
        .notEmpty()
        .withMessage('Nama penyewa wajib diisi')
        .isLength({ min: 3 })
        .withMessage('Nama penyewa minimal 3 karakter'),

    body('email')
        .notEmpty()
        .withMessage('Email penyewa wajib diisi')
        .isEmail()
        .withMessage('Format email tidak valid'),

    body('password')
        .notEmpty()
        .withMessage('Password wajib diisi')
        .isLength({ min: 6 })
        .withMessage('Password minimal 6 karakter'),

    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 10, max: 20 })
        .withMessage('Nomor telepon harus 10 sampai 20 karakter')
];

const updatePenyewaValidator = [
    ...penyewaIdParamValidator,

    body('name')
        .notEmpty()
        .withMessage('Nama penyewa wajib diisi')
        .isLength({ min: 3 })
        .withMessage('Nama penyewa minimal 3 karakter'),

    body('email')
        .notEmpty()
        .withMessage('Email penyewa wajib diisi')
        .isEmail()
        .withMessage('Format email tidak valid'),

    body('phone')
        .optional({ nullable: true, checkFalsy: true })
        .isLength({ min: 10, max: 20 })
        .withMessage('Nomor telepon harus 10 sampai 20 karakter')
];

module.exports = {
    penyewaIdParamValidator,
    createPenyewaValidator,
    updatePenyewaValidator
};