const express = require('express');
const router = express.Router();
const { getSlots, bookAppointment, getMyAppointments, cancelAppointment, rescheduleAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/slots', getSlots);
router.post('/book', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);
router.put('/:id/cancel', protect, cancelAppointment);
router.put('/:id/reschedule', protect, rescheduleAppointment);

module.exports = router;
