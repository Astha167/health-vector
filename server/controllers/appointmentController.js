const Appointment = require('../models/Appointment');
const { sendBookingConfirmationEmail } = require('../utils/emailSender');

// Available time slots
const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];

// @route GET /api/appointments/slots
const getSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const selectedDate = new Date(date);
    const bookedSlots = await Appointment.find({
      date: { $gte: new Date(selectedDate.setHours(0, 0, 0, 0)), $lt: new Date(selectedDate.setHours(23, 59, 59, 999)) },
      status: { $in: ['pending', 'confirmed'] },
    }).select('timeSlot');

    const bookedTimes = bookedSlots.map((a) => a.timeSlot);
    const availableSlots = TIME_SLOTS.map((slot) => ({ slot, available: !bookedTimes.includes(slot) }));

    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots' });
  }
};

// @route POST /api/appointments/book
const bookAppointment = async (req, res) => {
  try {
    const { assessmentType, date, timeSlot, name, email, phone, notes } = req.body;

    // Check if slot is still available
    const existing = await Appointment.findOne({
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existing) {
      return res.status(400).json({ message: 'This time slot is no longer available' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      assessmentType,
      date: new Date(date),
      timeSlot,
      name,
      email,
      phone,
      notes,
    });

    // Send confirmation email
    try {
      await sendBookingConfirmationEmail(email, appointment);
    } catch (emailErr) {
      console.error('Email failed:', emailErr.message);
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error booking appointment' });
  }
};

// @route GET /api/appointments/my
const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// @route PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (appointment.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    appointment.status = 'cancelled';
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};

// @route PUT /api/appointments/:id/reschedule
const rescheduleAppointment = async (req, res) => {
  try {
    const { date, timeSlot } = req.body;
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    appointment.date = new Date(date);
    appointment.timeSlot = timeSlot;
    appointment.status = 'pending';
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling appointment' });
  }
};

module.exports = { getSlots, bookAppointment, getMyAppointments, cancelAppointment, rescheduleAppointment };
