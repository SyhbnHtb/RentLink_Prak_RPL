// backend\backend\src\routes\profileRoutes.js
const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profileController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { handleValidationErrors } = require('../middlewares/validationMiddleware');

const {
    updateProfileValidator,
    changePasswordValidator
} = require('../validators/profileValidator');

// User login bisa melihat profile sendiri
router.get('/me', verifyToken, profileController.getMyProfile);

// User login bisa update profile sendiri
router.put(
    '/me',
    verifyToken,
    updateProfileValidator,
    handleValidationErrors,
    profileController.updateMyProfile
);

// User login bisa ganti password sendiri
router.put(
    '/change-password',
    verifyToken,
    changePasswordValidator,
    handleValidationErrors,
    profileController.changePassword
);

module.exports = router;