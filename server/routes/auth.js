const express = require('express');
const router = express.Router();
const { register, login, getMe, updateMe, changePassword, forgotPassword, resetPassword, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getMe);
router.put('/me', protect, updateMe);
router.put('/change-password', protect, changePassword);
router.delete('/me', protect, deleteAccount);

module.exports = router;
