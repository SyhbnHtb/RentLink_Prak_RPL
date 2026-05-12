// backend\backend\src\validators\authValidator.js
const { body } = require('express-validator');

const registerValidator = [
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

    body('password')
        .notEmpty()
        .withMessage('Password wajib diisi')
        .isLength({ min: 6 })
        .withMessage('Password minimal 6 karakter')
];

const loginValidator = [
    body('email')
        .notEmpty()
        .withMessage('Email wajib diisi')
        .isEmail()
        .withMessage('Format email tidak valid'),

    body('password')
        .notEmpty()
        .withMessage('Password wajib diisi')
];

module.exports = {
    registerValidator,
    loginValidator
};