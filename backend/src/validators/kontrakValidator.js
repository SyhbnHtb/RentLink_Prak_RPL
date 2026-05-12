// backend\backend\src\validators\kontrakValidator.js
const { body, param } = require('express-validator');

const kontrakIdParamValidator = [
    param('id')
        .isInt({ min: 1 })
        .withMessage('ID kontrak harus berupa angka positif')
];

const createKontrakValidator = [
    body('user_id')
        .notEmpty()
        .withMessage('user_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('user_id harus berupa angka positif'),

    body('unit_id')
        .notEmpty()
        .withMessage('unit_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('unit_id harus berupa angka positif'),

    body('tgl_mulai')
        .notEmpty()
        .withMessage('Tanggal mulai wajib diisi')
        .isISO8601()
        .withMessage('Tanggal mulai harus berformat YYYY-MM-DD'),

    body('tgl_akhir')
        .notEmpty()
        .withMessage('Tanggal akhir wajib diisi')
        .isISO8601()
        .withMessage('Tanggal akhir harus berformat YYYY-MM-DD')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.tgl_mulai)) {
                throw new Error('Tanggal akhir harus lebih besar dari tanggal mulai');
            }
            return true;
        }),

    body('status')
        .optional()
        .isIn(['aktif', 'selesai'])
        .withMessage('Status kontrak harus aktif atau selesai')
];

const updateKontrakValidator = [
    ...kontrakIdParamValidator,

    body('user_id')
        .notEmpty()
        .withMessage('user_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('user_id harus berupa angka positif'),

    body('unit_id')
        .notEmpty()
        .withMessage('unit_id wajib diisi')
        .isInt({ min: 1 })
        .withMessage('unit_id harus berupa angka positif'),

    body('tgl_mulai')
        .notEmpty()
        .withMessage('Tanggal mulai wajib diisi')
        .isISO8601()
        .withMessage('Tanggal mulai harus berformat YYYY-MM-DD'),

    body('tgl_akhir')
        .notEmpty()
        .withMessage('Tanggal akhir wajib diisi')
        .isISO8601()
        .withMessage('Tanggal akhir harus berformat YYYY-MM-DD')
        .custom((value, { req }) => {
            if (new Date(value) <= new Date(req.body.tgl_mulai)) {
                throw new Error('Tanggal akhir harus lebih besar dari tanggal mulai');
            }
            return true;
        }),

    body('status')
        .notEmpty()
        .withMessage('Status kontrak wajib diisi')
        .isIn(['aktif', 'selesai'])
        .withMessage('Status kontrak harus aktif atau selesai')
];

module.exports = {
    kontrakIdParamValidator,
    createKontrakValidator,
    updateKontrakValidator
};