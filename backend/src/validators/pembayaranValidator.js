// backend\backend\src\validators\pembayaranValidator.js
const { body, param } = require('express-validator');

const pembayaranIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID pembayaran harus berupa angka positif')
];

const uploadPembayaranValidator = [
    body('tagihan_id')
        .notEmpty()
        .withMessage('tagihan_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('tagihan_id harus berupa angka positif')
];

const verifyPembayaranValidator = [
    ...pembayaranIdParamValidator,

    body('status')
        .notEmpty()
        .withMessage('Status verifikasi wajib diisi')
        .isIn(['lunas', 'ditolak'])
        .withMessage('Status verifikasi harus lunas atau ditolak')
];

module.exports = {
    pembayaranIdParamValidator,
    uploadPembayaranValidator,
    verifyPembayaranValidator
};