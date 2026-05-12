// backend\backend\src\validators\tagihanValidator.js
const { body, param } = require('express-validator');

const tagihanIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID tagihan harus berupa angka positif')
];

const generateTagihanValidator = [
    body('kontrak_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('kontrak_id harus berupa angka positif'),

    body('bulan')
        .notEmpty()
        .withMessage('Bulan wajib diisi'),

    body('tahun')
        .notEmpty()
        .withMessage('Tahun wajib diisi')
        .isInt({ min: 2000 })
        .withMessage('Tahun harus berupa angka valid')
];

module.exports = {
    tagihanIdParamValidator,
    generateTagihanValidator
};