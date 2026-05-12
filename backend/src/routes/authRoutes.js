// backend\backend\src\routes\authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

const {
    registerValidator,
    loginValidator
} = require('../validators/authValidator');

const { handleValidationErrors } = require('../middlewares/validationMiddleware');

// Register
router.post(
    '/register',
    registerValidator,
    handleValidationErrors,
    authController.register
);

// Login
router.post(
    '/login',
    loginValidator,
    handleValidationErrors,
    authController.login
);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

module.exports = router;