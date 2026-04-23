const express = require('express');
const router = express.Router();
const { getStats, getUsers, updateUserRole, getAppointments, updateAppointmentStatus, handleContact } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.get('/stats', protect, adminOnly, getStats);
router.get('/users', protect, adminOnly, getUsers);
router.put('/users/:id/role', protect, adminOnly, updateUserRole);
router.get('/appointments', protect, adminOnly, getAppointments);
router.put('/appointments/:id/status', protect, adminOnly, updateAppointmentStatus);
router.post('/contact', handleContact); // public — contact form

module.exports = router;
