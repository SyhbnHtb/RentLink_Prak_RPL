// backend\backend\src\validators\meteranValidator.js
const { body, param } = require('express-validator');

const meteranIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID meteran harus berupa angka positif')
];

const meteranBodyValidator = [
    body('unit_id')
        .notEmpty()
        .withMessage('unit_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('unit_id harus berupa angka positif'),

    body('bulan')
        .notEmpty()
        .withMessage('Bulan wajib diisi'),

    body('tahun')
        .notEmpty()
        .withMessage('Tahun wajib diisi')
        .isInt({ min: 2000 })
        .withMessage('Tahun harus berupa angka valid'),

    body('meter_listrik_awal')
        .notEmpty()
        .withMessage('Meter listrik awal wajib diisi')
        .isNumeric()
        .withMessage('Meter listrik awal harus berupa angka'),

    body('meter_listrik_akhir')
        .notEmpty()
        .withMessage('Meter listrik akhir wajib diisi')
        .isNumeric()
        .withMessage('Meter listrik akhir harus berupa angka')
        .custom((value, { req }) => {
            if (Number(value) < Number(req.body.meter_listrik_awal)) {
                throw new Error('Meter listrik akhir tidak boleh lebih kecil dari meter listrik awal');
            }
            return true;
        }),

    body('meter_air_awal')
        .notEmpty()
        .withMessage('Meter air awal wajib diisi')
        .isNumeric()
        .withMessage('Meter air awal harus berupa angka'),

    body('meter_air_akhir')
        .notEmpty()
        .withMessage('Meter air akhir wajib diisi')
        .isNumeric()
        .withMessage('Meter air akhir harus berupa angka')
        .custom((value, { req }) => {
            if (Number(value) < Number(req.body.meter_air_awal)) {
                throw new Error('Meter air akhir tidak boleh lebih kecil dari meter air awal');
            }
            return true;
        })
];

const createMeteranValidator = meteranBodyValidator;

const updateMeteranValidator = [
    ...meteranIdParamValidator,
    ...meteranBodyValidator
];

module.exports = {
    meteranIdParamValidator,
    createMeteranValidator,
    updateMeteranValidator
};