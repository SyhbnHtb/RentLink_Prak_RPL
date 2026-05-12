// backend\backend\src\validators\unitValidator.js
const { body, param } = require('express-validator');

const unitIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID unit harus berupa angka positif')
];

const createUnitValidator = [

    body('nama_unit')
        .notEmpty()
        .withMessage('Nama unit wajib diisi'),

    body('tipe')
        .notEmpty()
        .withMessage('Tipe unit wajib diisi'),

    body('harga')
        .notEmpty()
        .withMessage('Harga unit wajib diisi')
        .isNumeric()
        .withMessage('Harga unit harus berupa angka')
        .custom((value) => Number(value) > 0)
        .withMessage('Harga unit harus lebih dari 0'),

    body('status')
        .optional()
        .isIn(['tersedia', 'terisi'])
        .withMessage('Status unit harus tersedia atau terisi')
];

const updateUnitValidator = [
    ...unitIdParamValidator,
    body('lantai')
        .optional({ nullable: true, checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage('Lantai harus berupa angka positif'),
    body('nama_unit')
        .notEmpty()
        .withMessage('Nama unit wajib diisi'),

    body('tipe')
        .notEmpty()
        .withMessage('Tipe unit wajib diisi'),

    body('harga')
        .notEmpty()
        .withMessage('Harga unit wajib diisi')
        .isNumeric()
        .withMessage('Harga unit harus berupa angka')
        .custom((value) => Number(value) > 0)
        .withMessage('Harga unit harus lebih dari 0'),

    body('status')
        .notEmpty()
        .withMessage('Status unit wajib diisi')
        .isIn(['tersedia', 'terisi'])
        .withMessage('Status unit harus tersedia atau terisi')
];

module.exports = {
    unitIdParamValidator,
    createUnitValidator,
    updateUnitValidator
};